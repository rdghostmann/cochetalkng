// components/pro/AskQuestionModal.tsx

import { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { KeyboardAwareView } from "../ui/KeyboardAwareView";

const VEHICLE_TYPES = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Pickup",
    "Van",
    "Bus",
    "Other",
];

const COMMON_TAGS = [
    "Honda",
    "Toyota",
    "Volkswagen",
    "Nissan",
    "Ford",
    "Hyundai",
    "Engine",
    "Transmission",
    "Brakes",
    "Suspension",
    "Electrical",
    "Cooling",
    "AC",
    "Tires",
];

const CONCERNS = [
    {
        key: "hearConcern",
        label: "Hear Something",
    },
    {
        key: "seeConcern",
        label: "See Something",
    },
    {
        key: "smellConcern",
        label: "Smell Something",
    },
    {
        key: "feelConcern",
        label: "Feel Something",
    },
    {
        key: "notStarting",
        label: "Not Starting",
    },
    {
        key: "performanceConcern",
        label: "Performance Issue",
    },
    {
        key: "dashboardWarningLights",
        label: "Dashboard Warning",
    },
] as const;

type ConcernKey =
    (typeof CONCERNS)[number]["key"];

type Props = {
    visible: boolean;

    onClose: () => void;

    askQuestion: (payload: any) => void;
};

export function AskQuestionModal({
    visible,
    onClose,
    askQuestion,
}: Props) {
    const [title, setTitle] = useState("");

    const [description, setDescription] =
        useState("");

    const [vehicleModel, setVehicleModel] =
        useState("");

    const [vehicleType, setVehicleType] =
        useState("Sedan");

    const [selectedTags, setSelectedTags] =
        useState<string[]>([]);

    const [privateOnly, setPrivateOnly] =
        useState(false);

    const [concerns, setConcerns] =
        useState<Record<ConcernKey, boolean>>({
            hearConcern: false,
            seeConcern: false,
            smellConcern: false,
            feelConcern: false,
            notStarting: false,
            performanceConcern: false,
            dashboardWarningLights: false,
        });

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setVehicleModel("");
        setVehicleType("Sedan");
        setSelectedTags([]);
        setPrivateOnly(false);

        setConcerns({
            hearConcern: false,
            seeConcern: false,
            smellConcern: false,
            feelConcern: false,
            notStarting: false,
            performanceConcern: false,
            dashboardWarningLights: false,
        });
    };

    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [visible]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const toggleConcern = (
        key: ConcernKey
    ) => {
        setConcerns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSubmit = () => {
        if (
            !title.trim() ||
            !description.trim()
        ) {
            return;
        }

        askQuestion({
            title: title.trim(),

            description:
                description.trim(),

            tags: selectedTags.join(","),

            yrModel:
                vehicleModel.trim(),

            vehicleType,

            isPrivateEcosystem:
                privateOnly,

            ...concerns,
        });

        resetForm();

        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                className="absolute inset-0 bg-black/50"
                onPress={onClose}
            />

            <View className="absolute bottom-0 left-0 right-0 max-h-[92%] rounded-t-3xl bg-background">

                <View className="items-center py-3">
                    <View className="h-1.5 w-12 rounded-full bg-border" />
                </View>

                <View className="flex-row items-center justify-between border-b border-border px-5 pb-4">

                    <Text className="text-xl font-bold text-foreground">
                        Ask a Question
                    </Text>

                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <Feather
                            name="x"
                            size={22}
                            color="#888"
                        />
                    </TouchableOpacity>

                </View>

                <KeyboardAwareView
                    className="flex-1"
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 40,
                    }}
                >
                    {/* Title */}
                    <Text className="mb-2 text-sm font-semibold text-foreground">
                        Title *
                    </Text>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Briefly describe your issue"
                        placeholderTextColor="#9CA3AF"
                        className="rounded-xl border border-border bg-card px-4 py-3 text-foreground"
                    />

                    {/* Description */}
                    <Text className="mb-2 mt-5 text-sm font-semibold text-foreground">
                        Description *
                    </Text>

                    <TextInput
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Explain the issue in detail..."
                        placeholderTextColor="#9CA3AF"
                        className="min-h-[120px] rounded-xl border border-border bg-card px-4 py-3 text-foreground"
                    />

                    {/* Vehicle Model */}
                    <Text className="mb-2 mt-5 text-sm font-semibold text-foreground">
                        Vehicle Year / Model
                    </Text>

                    <TextInput
                        value={vehicleModel}
                        onChangeText={setVehicleModel}
                        placeholder="e.g. 2017 Toyota Corolla"
                        placeholderTextColor="#9CA3AF"
                        className="rounded-xl border border-border bg-card px-4 py-3 text-foreground"
                    />

                    {/* Vehicle Type */}
                    <Text className="mb-2 mt-5 text-sm font-semibold text-foreground">
                        Vehicle Type
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {VEHICLE_TYPES.map((type) => {
                            const active = vehicleType === type;

                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => setVehicleType(type)}
                                    className={`mr-2 rounded-full border px-4 py-2 ${active
                                            ? "border-primary bg-primary"
                                            : "border-border bg-card"
                                        }`}
                                >
                                    <Text
                                        className={
                                            active
                                                ? "font-medium text-primary-foreground"
                                                : "font-medium text-muted-foreground"
                                        }
                                    >
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* Tags */}
                    <Text className="mb-2 mt-6 text-sm font-semibold text-foreground">
                        Tags
                    </Text>

                    <View className="flex-row flex-wrap">
                        {COMMON_TAGS.map((tag) => {
                            const selected =
                                selectedTags.includes(tag);

                            return (
                                <TouchableOpacity
                                    key={tag}
                                    onPress={() => toggleTag(tag)}
                                    className={`mb-2 mr-2 rounded-full border px-4 py-2 ${selected
                                            ? "border-primary bg-primary/10"
                                            : "border-border bg-card"
                                        }`}
                                >
                                    <Text
                                        className={
                                            selected
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }
                                    >
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Symptoms */}
                    <Text className="mb-2 mt-6 text-sm font-semibold text-foreground">
                        Symptoms
                    </Text>

                    <View className="flex-row flex-wrap">
                        {CONCERNS.map((item) => {
                            const active = concerns[item.key];

                            return (
                                <TouchableOpacity
                                    key={item.key}
                                    onPress={() =>
                                        toggleConcern(item.key)
                                    }
                                    className={`mb-2 mr-2 flex-row items-center rounded-full border px-4 py-2 ${active
                                            ? "border-primary bg-primary/10"
                                            : "border-border bg-card"
                                        }`}
                                >
                                    {active && (
                                        <Feather
                                            name="check"
                                            size={12}
                                            color="#22C55E"
                                            style={{
                                                marginRight: 6,
                                            }}
                                        />
                                    )}

                                    <Text
                                        className={
                                            active
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Private Toggle */}
                    <View className="mt-6 flex-row items-center justify-between rounded-xl border border-border bg-card p-4">
                        <View className="flex-1 pr-4">
                            <Text className="font-semibold text-foreground">
                                Post to Pro Circle only
                            </Text>

                            <Text className="mt-1 text-xs text-muted-foreground">
                                Only verified mechanics and service
                                providers can see this question.
                            </Text>
                        </View>

                        <Switch
                            value={privateOnly}
                            onValueChange={setPrivateOnly}
                        />
                    </View>

                    {/* Submit */}
                    <TouchableOpacity
                        disabled={
                            !title.trim() ||
                            !description.trim()
                        }
                        onPress={handleSubmit}
                        className={`mt-8 rounded-xl bg-gray-200 py-4 ${title.trim() &&
                                description.trim()
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                    >
                        <Text className="text-center text-base font-bold text-primary">
                            Post Question
                        </Text>
                    </TouchableOpacity>

                    <View className="h-8" />
                </KeyboardAwareView>
            </View>
        </Modal>
    );
}