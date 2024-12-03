'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface responsee {
  id: string;
  modifiedContent: string;
  processedFiles: string[];
  error?: string;
}

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<responsee | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('/api/automate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoURL: githubUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'An unknown error occurred');
      }

      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto max-w-4xl p-4'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Github className='mr-2' /> Responsee
          </CardTitle>
          <CardDescription>
            Input a GitHub repository URL to generate and modify style files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4 flex space-x-2'>
            <Input
              placeholder='Enter GitHub repository URL'
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleGenerate} disabled={isLoading || !githubUrl}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Generating
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>

          {error && (
            <Alert variant='destructive' className='mb-4'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {response && (
            <Tabs defaultValue='summary' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='summary'>Summary</TabsTrigger>
                <TabsTrigger value='content'>Modified Content</TabsTrigger>
              </TabsList>
              <TabsContent value='summary'>
                <Card>
                  <CardContent className='space-y-2 p-6'>
                    <div className='flex items-center space-x-2'>
                      <CheckCircle2 className='text-green-500' />
                      <span>Processing Session ID: {response.id}</span>
                    </div>
                    <Separator />
                    <div>
                      <h3 className='font-semibold'>Processed Files:</h3>
                      <ul className='list-inside list-disc text-sm text-muted-foreground'>
                        {response.processedFiles.map((file, index) => (
                          <li key={index}>{file}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='content'>
                <Card>
                  <CardContent className='p-0'>
                    <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
                      <pre className='font-mono text-xs'>
                        {response.modifiedContent}
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
