import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function modifyFileContent(fileContent: string): Promise<string> {
  try {
    const prompt = `
You are an elite Front-End Styling Expert with deep expertise in creating pixel-perfect, highly responsive, and performance-optimized CSS. Your goal is to transform the provided CSS into a robust, modern styling solution that works flawlessly across all devices and screen sizes.

COMPREHENSIVE RESPONSIVENESS ANALYSIS:
1. Responsive Design Principles
- Implement a strict mobile-first approach
- Create fluid, adaptive layouts that scale seamlessly
- Prioritize relative units (rem, %, vh/vw) over fixed pixels
- Ensure optimal readability and usability across devices

2. Breakpoint Strategy
Implement these precise, modern breakpoints:
- Mobile: 0px - 600px
- Tablet: 601px - 1024px
- Desktop: 1025px - 1440px
- Large Screens: 1441px and above

3. Advanced Responsive Techniques
- Utilize CSS Grid and Flexbox for complex layouts
- Implement container queries where applicable
- Add fluid typography using clamp() function
- Optimize for touch interfaces and varying input methods

4. Performance Optimization
- Minimize CSS specificity
- Remove redundant styles
- Use CSS custom properties (variables) for consistent theming
- Implement efficient media queries
- Reduce unnecessary cascading and inheritance

5. Cross-Browser Compatibility
- Ensure styles work across modern browsers
- Add necessary vendor prefixes
- Implement fallback styles for older browsers
- Use feature queries (@supports) for progressive enhancement

SPECIFIC TRANSFORMATION GUIDELINES:
- Preserve the core intent of the original styles
- Enhance layout flexibility
- Improve overall design responsiveness
- Optimize for performance
- Ensure accessibility compliance

ADDITIONAL CONSTRAINTS:
- Do not alter the fundamental design language
- Maintain the original color scheme
- Preserve any custom animations or transitions
- Keep the code clean, readable, and well-commented

OUTPUT REQUIREMENTS:
- Return ONLY the transformed CSS
- Use consistent, clean formatting
- Add helpful comments explaining key responsive strategies
- Ensure the output is production-ready code

ORIGINAL CSS TO TRANSFORM:
\n\n${fileContent}
    `;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert front-end styling professional focused on creating highly responsive and optimized CSS.',
        },
        {
          role: 'user',
          content: prompt.trim(),
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 4096,
    });

    const modifiedContent: string = response.choices[0]?.message?.content || '';

    if (!modifiedContent) {
      throw new Error('No content returned from Groq API. Please try again.');
    }
    if (modifiedContent.trim().length < 50) {
      throw new Error(
        'Generated CSS appears to be too short or potentially invalid.'
      );
    }

    return modifiedContent;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Comprehensive CSS Transformation Error:', err.message);
      throw err;
    } else {
      console.error(
        'Comprehensive CSS Transformation Error: An unknown error occurred',
        err
      );
      throw new Error('An unexpected error occurred');
    }
  }
}
