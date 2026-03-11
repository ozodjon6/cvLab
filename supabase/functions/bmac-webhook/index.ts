// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Ushbu funksiyaga faqat Buy Me a Coffee (BMAC) tomonidan webhook keladi
serve(async (req) => {
  try {
    // 1. BMAC yuborgan JSON xabarni o'qib olamiz
    const payload = await req.json()
    console.log("BMAC Webhook qabul qilindi:", payload)

    // Odatda BMAC to'lov qilganda type: "donation.created" keladi
    // "supporter_email" maydonida o'sha qahva sotib olgan insonning emaili bo'ladi.
    if (payload.type === "donation.created" && payload.data?.supporter_email) {
      const email = payload.data.supporter_email.trim().toLowerCase()

      // 2. Supabase ulanishini yaratamiz
      // Diqqat: Bu yerda SUPABASE_SERVICE_ROLE_KEY (juda maxfiy kalit) ishlatamiz, chunki auth_users ni yangilashga oddiy kalit ruxsat bermaydi.
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      
      const supabase = createClient(supabaseUrl, supabaseKey)

      // 3. Email orqali u foydalanuvchini bazadan (auth) qidiramiz
      const { data: usersData, error: findError } = await supabase.auth.admin.listUsers()
      
      if (findError) throw findError

      const user = usersData.users.find((u) => u.email === email)

      if (user) {
        // 4. Agar user topilsa, uning metadatasiga "is_premium: true" ni qo'shib qo'yamiz
        const newMetaData = { ...user.user_metadata, is_premium: true }
        
        const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
          user_metadata: newMetaData
        })

        if (updateError) throw updateError
        
        console.log(`Muvaffaqiyatli Premium statusi berildi: ${email}`)
      } else {
        console.log(`Bunday emalli foydalanuvchi tizimdan topilmadi: ${email}`)
      }
    }

    // BMAC ga "Hammasi yaxshi" degan javobni qaytaramiz
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error: any) {
    console.error("Xatolik yuz berdi:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
