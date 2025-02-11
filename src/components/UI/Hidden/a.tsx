import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowRight, Brain, Book, Cable, GitCommit, MessageCircle, LucideIcon, RotateCcw } from 'lucide-react';

interface Step {
    type: string;
    content: string;
}

interface Concept {
    name: string;
    steps: Step[];
}

interface Concepts {
    [key: string]: Concept;
}

interface DataPoint {
    iteration: number;
    strength: number;
    accuracy: number;
}

const LearningVisualizer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedConcept, setSelectedConcept] = useState('sky');
    const [connectionStrength, setConnectionStrength] = useState<DataPoint[]>([]);
    const [iteration, setIteration] = useState(1);
    const [totalIterations, setTotalIterations] = useState<DataPoint[]>([]);

    const concepts: Concepts = {
        sky: {
            name: "The sky is blue",
            steps: [
                { type: "introduction", content: "What is the color of the sky?" },
                { type: "exploration", content: "Why do you think the sky has that color?" },
                { type: "focus", content: "The sky is blue due to the scattering of sunlight." },
                { type: "connection", content: "How does this relate to what you know about light and colors?" },
                { type: "feedback", content: "You made a connection between the sky and water, but water is not blue because of sunlight, it is because of the refraction." }
            ]
        },
        apple: {
            name: "Apples are fruits",
            steps: [
                { type: "introduction", content: "What kind of food is an apple?" },
                { type: "exploration", content: "What other foods are similar to apples?" },
                { type: "focus", content: "Apples are fruits with a stem, seeds and flesh." },
                { type: "connection", content: "How are apples different from vegetables?" },
                { type: "feedback", content: "You correctly identified that apples are a fruit, based on their structure, but now try to make more connections with different concepts." }
            ]
        },
        sleep: {
            name: "Humans need to sleep",
            steps: [
                { type: "introduction", content: "What do humans do when they are tired?" },
                { type: "exploration", content: "Why do you think humans need sleep?" },
                { type: "focus", content: "Humans need sleep to repair their body and brain." },
                { type: "connection", content: "How does this relate to your understanding of human health?" },
                { type: "feedback", content: "You connected sleep with rest, and you also mentioned that sleep is very important, this connection is very accurate!" }
            ]
        }
    };

    useEffect(() => {
        const generateData = () => {
            return Array.from({ length: 10 }, (_, i) => ({
                iteration: i + 1,
                strength: Math.min(90, 30 + i * 8 + Math.random() * 10),
                accuracy: Math.min(95, 40 + i * 7 + Math.random() * 8)
            }));
        };
        
        const data = generateData();
        setConnectionStrength(data);
        setTotalIterations(prev => [...prev, data[iteration - 1]]);
    }, [selectedConcept, iteration]);

    const getStepIcon = (type: string): LucideIcon => {
        switch (type) {
            case 'introduction': return Book;
            case 'exploration': return Brain;
            case 'focus': return GitCommit;
            case 'connection': return Cable;
            case 'feedback': return MessageCircle;
            default: return ArrowRight;
        }
    };

    const resetLearning = () => {
        setCurrentStep(0);
        setIteration(1);
        setTotalIterations([]);
    };

    const handleNextStep = () => {
        if (currentStep === 4) {
            if (iteration < 3) {
                setIteration(prev => prev + 1);
                setCurrentStep(0);
            }
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">FEN Learning Visualization</h2>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Iteration: {iteration}/3</span>
                        <button
                            onClick={resetLearning}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Reset Learning"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Concept Selector */}
                <div className="mb-8 flex gap-4">
                    {Object.keys(concepts).map((concept) => (
                        <button
                            key={concept}
                            onClick={() => {
                                setSelectedConcept(concept);
                                resetLearning();
                            }}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                selectedConcept === concept
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {concepts[concept].name}
                        </button>
                    ))}
                </div>

                {/* Learning Process Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Steps Visualization */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Learning Steps</h3>
                        <div className="space-y-4">
                            {concepts[selectedConcept].steps.map((step, index) => {
                                const Icon = getStepIcon(step.type);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ 
                                            opacity: index <= currentStep ? 1 : 0.5,
                                            x: 0 
                                        }}
                                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                            index === currentStep ? 'bg-blue-50 border border-blue-200' : ''
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 mt-1" />
                                        <div>
                                            <div className="font-medium capitalize">{step.type}</div>
                                            <div className="text-gray-600">{step.content}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Learning Metrics */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
                        <LineChart width={500} height={300} data={totalIterations}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="iteration" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="strength" 
                                stroke="#2563eb" 
                                name="Connection Strength"
                            />
                            <Line 
                                type="monotone" 
                                dataKey="accuracy" 
                                stroke="#16a34a" 
                                name="Learning Accuracy"
                            />
                        </LineChart>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
                    >
                        Previous Step
                    </button>
                    <button
                        onClick={handleNextStep}
                        disabled={currentStep === 4 && iteration === 3}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
                    >
                        {currentStep === 4 && iteration < 3 ? 'Next Iteration' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LearningVisualizer;