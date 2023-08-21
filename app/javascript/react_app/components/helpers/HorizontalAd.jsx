import React, { useEffect } from "react"

export default function HorizontalAd() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.log("adsense error", error.message)
    }
  }, [])

  return (
    <div className="min-w-[74rem] p-4">
      <ins
        className="adsbygoogle block shadow"
        data-ad-client="ca-pub-3604764545265406"
        data-ad-slot="2582212215"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  )
}
