import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pknvjdrozlkyahanzozv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzY5OTIwOSwiZXhwIjoxOTQzMjc1MjA5fQ.1OtjNHK-WdvFiePtifslNMDJUhfHGOxpjfss-F46wOg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
