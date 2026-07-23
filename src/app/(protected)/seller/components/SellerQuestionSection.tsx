import { Text, View } from "react-native";

import { QuestionCard } from "@/components/ui/QuestionCard";

import type {
    Answer,
    ForumQuestion,
} from "@/types/forum.types";

interface Props {
    questions: ForumQuestion[];

    answers: Answer[];
}

export function SellerQuestionSection({
    questions,
    answers,
}: Props) {
    if (!questions.length) {
        return null;
    }

    return (
        <View className="mt-8">

            <Text className="mb-4 text-lg font-bold text-foreground">
                Questions ({questions.length})
            </Text>

            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    answerCount={
                        answers.filter(
                            (answer) =>
                                answer.questionId ===
                                question.id
                        ).length
                    }
                />
            ))}

        </View>
    );
}