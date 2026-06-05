import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import NeonButton from '@/components/ui/NeonButton';
import HudBadge from '@/components/ui/HudBadge';

import { api } from '@/api/client';

const BADGES = {
  casual_mcu: { label: 'MCU Rookie', icon: '🎬', color: 'blue' },
  hardcore_mcu: { label: 'MCU Master', icon: '⚡', color: 'red' },
  casual_characters: { label: 'Hero Spotter', icon: '🦸', color: 'blue' },
  hardcore_characters: { label: 'Character Expert', icon: '🔬', color: 'gold' },
  perfect: { label: 'INFINITY GENIUS', icon: '🏆', color: 'gold' },
};

function getBadge(score, total, category, difficulty) {
  if (score === total) return BADGES.perfect;
  const key = `${difficulty}_${category}`;
  return BADGES[key] || { label: 'Marvel Scholar', icon: '📚', color: 'blue' };
}

export default function Quiz() {
  const [phase, setPhase] = useState('select');
  const [category, setCategory] = useState('mcu');
  const [difficulty, setDifficulty] = useState('casual');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    setLoading(true);

    const qs = await api.trivia.getQuestions({
      category,
      difficulty,
      limit: 10,
    });

    setQuestions(qs);
    setScore(0);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(20);
    setPhase('playing');
    setLoading(false);
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    if (selected !== null) return;

    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, selected]);

  const handleAnswer = useCallback((option) => {
    if (selected !== null) return;

    const q = questions[current];
    const correct = option === q.correct_answer;

    setSelected(option);

    if (correct) setScore(s => s + 1);

    setAnswers(prev => [
      ...prev,
      {
        question: q.question,
        selected: option,
        correct: q.correct_answer,
        isCorrect: correct
      }
    ]);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setPhase('result');
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setTimeLeft(20);
      }
    }, 1200);
  }, [selected, current, questions]);

  const saveSession = async () => {
    const user = await api.auth.me();
    if (!user) return;

    const badge = getBadge(score, questions.length, category, difficulty);

    await api.quiz.createSession({
      user_id: user.id,
      category,
      difficulty,
      score,
      total_questions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      badge_earned: badge.label,
    });
  };

  useEffect(() => {
    if (phase === 'result') saveSession();
  }, [phase]);

  const q = questions[current];

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-orbitron font-bold text-3xl text-white mb-1">
            Trivia Mode
          </h1>
          <p className="text-white/40 font-rajdhani tracking-wider">
            TEST YOUR MARVEL KNOWLEDGE
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* SELECT */}
          {phase === 'select' && (
            <motion.div>
              <div className="glass rounded-2xl p-8 space-y-6">

                <div>
                  <p className="font-rajdhani font-semibold text-white/50 text-sm mb-3">
                    SELECT CATEGORY
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {['mcu', 'comics', 'characters', 'history'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`p-4 rounded-xl border ${
                          category === cat
                            ? 'border-neon-red/60 bg-neon-red/10'
                            : 'border-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-rajdhani font-semibold text-white/50 text-sm mb-3">
                    DIFFICULTY
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {['casual', 'hardcore'].map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`p-4 rounded-xl border ${
                          difficulty === d
                            ? 'border-neon-red/60 bg-neon-red/10'
                            : 'border-white/10'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <NeonButton
                  variant="solid"
                  onClick={startQuiz}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  {loading ? 'LOADING QUESTIONS...' : 'START QUIZ'}
                </NeonButton>

              </div>
            </motion.div>
          )}

          {/* PLAYING */}
          {phase === 'playing' && q && (
            <motion.div>
              <div className="glass rounded-2xl p-6 mb-4">
                <h3 className="font-rajdhani font-bold text-white text-xl">
                  {q.question}
                </h3>
              </div>

              <div className="space-y-3">
                {q.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selected !== null}
                    className="w-full p-4 rounded-xl border text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === 'result' && (
            <motion.div>
              <div className="glass rounded-2xl p-8 text-center">

                <div className="text-6xl mb-4">
                  {getBadge(score, questions.length, category, difficulty).icon}
                </div>

                <div className="font-orbitron text-5xl text-neon-red mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>

                <div className="font-rajdhani text-white text-xl mb-4">
                  {score} / {questions.length}
                </div>

                <NeonButton
                  variant="blue"
                  onClick={() => setPhase('select')}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </NeonButton>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}