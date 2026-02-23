<template>
  <div>
    <AppNav />
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <CtaSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav       from '@/components/layout/AppNav.vue'
import AppFooter    from '@/components/layout/AppFooter.vue'
import HeroSection  from '@/components/landing/HeroSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import HowItWorks   from '@/components/landing/HowItWorks.vue'
import CtaSection   from '@/components/landing/CtaSection.vue'
</script>
