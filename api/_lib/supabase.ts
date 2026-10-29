type InquiryRow = Record<string, unknown>

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, '')
  const key = process.env.SUPABASE_SECRET_KEY?.trim()
  if (!url || !key) throw new Error('Supabase server configuration is missing.')
  return { url, key }
}

/** Server-only insert into public.inquiries. Never import this helper into browser code. */
export async function saveInquiry(row: InquiryRow) {
  const { url, key } = getSupabaseConfig()
  const result = await fetch(`${url}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (!result.ok) {
    const detail = await result.text().catch(() => '')
    // Avoid logging credentials or customer data.
    console.error('Supabase inquiry insert failed:', result.status, detail.slice(0, 500))
    throw new Error(`Supabase rejected the inquiry (${result.status}).`)
  }
}
