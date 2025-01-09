class SimpleNeuralNetwork {
    constructor() {
        // Initialize any necessary parameters
    }

    summarize(inputText: string) {
        const sentences = inputText.split('. ');
        const keywordWeights = this.extractKeywords(inputText);
        const sentenceScores = sentences.map(sentence => this.scoreSentence(sentence, keywordWeights));

        // Select top sentences based on scores
        const topSentences = this.selectTopSentences(sentences, sentenceScores, 3); // Get top 3 sentences
        return topSentences.join('. ') + (topSentences.length > 1 ? '.' : '');
    }

    extractKeywords(text: string): { [key: string]: number } {
        const keywords: { [key: string]: number } = {}; // Define the type for keywords
        const words = text.split(/\W+/);
        words.forEach(word => {
            const lowerWord = word.toLowerCase();
            keywords[lowerWord] = (keywords[lowerWord] || 0) + 1; // Count occurrences
        });
        return keywords;
    }

    scoreSentence(sentence: string, keywordWeights: { [key: string]: number }): number {
        const words = sentence.split(/\W+/);
        let score = 0;
        words.forEach(word => {
            score += keywordWeights[word.toLowerCase()] || 0; // Add keyword weight
        });
        return score + sentence.length; // Add length as a factor
    }

    selectTopSentences(sentences: string[], scores: number[], topN: number): string[] {
        const indexedScores = sentences.map((sentence, index) => ({ sentence, score: scores[index] }));
        indexedScores.sort((a, b) => b.score - a.score); // Sort by score
        return indexedScores.slice(0, topN).map(item => item.sentence); // Get top N sentences
    }
}

export default new SimpleNeuralNetwork();