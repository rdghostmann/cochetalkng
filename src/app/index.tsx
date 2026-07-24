import { supabase } from "@/services/supabase/client";
import { Link } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

type Instrument = {
  id: number;
  name: string;
};

export default function HomeScreen() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase
      .from('instruments')
      .select('*');

    if (error) {
      console.error('Failed to load instruments:', error.message);
      setInstruments([]);
      return;
    }

    setInstruments(data ?? []);
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Home Screen!
      </Text>
      <Link className="text-blue-500 underline" href="/contact">
        Contact
      </Link>

      <Text>Instruments</Text>
      <FlatList<Instrument>
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListEmptyComponent={<Text>No instruments found.</Text>}
      />
    </View>
  );
}

