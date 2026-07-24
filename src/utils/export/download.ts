// src/utils/export/download.ts

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export async function downloadCsv(
    filename: string,
    csv: string
) {
    if (Platform.OS === "web") {

        const blob = new Blob(
            ["\uFEFF" + csv],
            {
                type: "text/csv;charset=utf-8",
            }
        );

        const url =
            window.URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);

        return;
    }

    const baseDir = (FileSystem as any).cacheDirectory ?? (FileSystem as any).documentDirectory ?? "";
    const uri = baseDir + filename;

    await FileSystem.writeAsStringAsync(
        uri,
        csv
    );

    if (
        await Sharing.isAvailableAsync()
    ) {
        await Sharing.shareAsync(uri);
    }
}