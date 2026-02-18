"use client";

import { useState } from 'react';
import { generateMockup } from '@/ai/flows/ai-powered-mockup-generation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export function AiMockupGenerator() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please enter a brief description for your plumbing landing page mockup.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateMockup({ description });
      setMockupUrl(result.mockupImageUrl);
      toast({
        title: "Mockup Generated!",
        description: "Your abstract plumbing landing page visual is ready.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while creating your mockup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bento-card border-none shadow-none bg-accent/5 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Lab</span>
        </div>
        <CardTitle className="text-2xl font-bold">Generate a Custom Mockup</CardTitle>
        <CardDescription>
          Visualize your vision. Describe your dream landing page layout and let our AI generate an abstract high-converting mockup.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="e.g. Modern emergency drain repair landing page with technician photo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="flex-1 bg-white border-muted h-12 rounded-xl focus:ring-accent"
          />
          <Button 
            type="submit" 
            disabled={loading} 
            className="h-12 px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Designing...
              </>
            ) : (
              'Generate Visual'
            )}
          </Button>
        </form>

        <div className="relative min-h-[300px] md:min-h-[400px] w-full rounded-2xl bg-white border-2 border-dashed border-muted flex items-center justify-center overflow-hidden">
          {mockupUrl ? (
            <div className="relative w-full h-full animate-fade-in-up">
              <Image 
                src={mockupUrl} 
                alt="Generated plumbing mockup" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="text-center p-10 flex flex-col items-center gap-4 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 opacity-40" />
              </div>
              <div>
                <p className="font-medium text-foreground">No mockup generated yet</p>
                <p className="text-sm max-w-xs">Enter a description above to see the AI create a custom visual for your business.</p>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-[10px] text-center text-muted-foreground">
          * AI-generated visuals are abstract representations intended for architectural layout and style exploration. No real brand logos or specific text are included.
        </p>
      </CardContent>
    </Card>
  );
}