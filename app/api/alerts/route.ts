import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no está configurado.", code: "NO_SUPABASE" }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión.", code: "UNAUTHENTICATED" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("price_alerts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message, code: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ alerts: data ?? [] });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no está configurado.", code: "NO_SUPABASE" }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión.", code: "UNAUTHENTICATED" }, { status: 401 });
  }

  const body = await request.json();
  const { destinationCity, destinationCountry, destinationAirportCode, maxPrice } = body;

  if (!destinationCity || !destinationAirportCode || !maxPrice || Number(maxPrice) <= 0) {
    return NextResponse.json({ error: "Datos de alerta incompletos.", code: "INVALID_ALERT" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("price_alerts")
    .insert({
      user_id: user.id,
      destination_city: destinationCity,
      destination_country: destinationCountry ?? "",
      destination_airport_code: destinationAirportCode,
      max_price: Number(maxPrice),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, code: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ alert: data }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no está configurado.", code: "NO_SUPABASE" }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión.", code: "UNAUTHENTICATED" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Falta el id de la alerta.", code: "MISSING_ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("price_alerts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message, code: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
