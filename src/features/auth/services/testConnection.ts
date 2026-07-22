import { supabase } from "@/services/supabase/client";

export async function testConnection() {
  const { data, error } = await supabase.auth.getSession();

  console.log("Session:", data);

  if (error) {
    console.error(error);
  }
}