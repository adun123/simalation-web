import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CTASection from "@/components/landing/CTASection";
import { getQuizQuestions } from "@/lib/supabase/queries";
import { quizQuestions } from "@/data/quiz";

export default async function HomePage() {
  const dbQuiz = await getQuizQuestions();
  const quizCount = dbQuiz.length > 0 ? dbQuiz.length : quizQuestions.length;

  return (
    <>
      <Hero quizCount={quizCount} />
      <Features />
      <CTASection />
    </>
  );
}
