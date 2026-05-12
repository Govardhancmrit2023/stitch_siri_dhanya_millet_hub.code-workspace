import React from 'react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

const HealthBenefits = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen pb-24">
      <TopAppBar title="Health Benefits" />

      <main className="pt-20 pb-24 px-container-margin max-w-2xl mx-auto">
        {/* Hero/Introduction Section */}
        <section className="mb-lg">
          <div className="relative h-48 rounded-xl overflow-hidden mb-md shadow-md">
            <img className="w-full h-full object-cover" data-alt="Golden Millet Fields" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6rIAQf0IwPF7SkE8kOfezEkEgJJRUOG62TUIXjZ8ypd7OlDJdPELnlebTv6xSfy9FSccSyCtcIhZLwXkhWRmMCMC7qKWcKPkNfuRReAPCSiYqQWf26TiOpmBgrmjaX-qXKWQaFOViyubLJDorPDbHS5dWNlGHekMOrgUlko7HuTKK5guGZQk-aAOe1lBCT5Qk0oQUbWRUeLLpAv9q9BOL0rBmN59NhemxBErWLJXcMmItDRsfIAmhN5i2uirVffMJvOTZuFcjCj1p" alt="Golden Millet Fields" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
              <p className="text-white font-headline-md mb-xs">Ancient Grains, Modern Health</p>
              <p className="text-white/80 font-body-md">Discover the nutritional power of Siri-Dhanya millets.</p>
            </div>
          </div>
        </section>

        {/* Health Facts Vertical List */}
        <div className="space-y-md">
          {/* Fact Card 1: Ragi */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm flex gap-md items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>vital_signs</span>
            </div>
            <div>
              <h3 className="font-headline-md text-primary text-lg mb-1">Ragi (Finger Millet)</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Ragi is rich in <span className="font-bold text-secondary">calcium</span> &amp; good for <span className="font-bold text-secondary">diabetes</span>. It helps in bone strengthening and maintaining healthy blood sugar levels.
              </p>
              <div className="mt-sm flex flex-wrap gap-2">
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-label-sm text-outline font-medium border border-outline-variant">High Fiber</span>
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-label-sm text-outline font-medium border border-outline-variant">Iron Rich</span>
              </div>
            </div>
          </div>

          {/* Fact Card 2: Navane */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm flex gap-md items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>feed</span>
            </div>
            <div>
              <h3 className="font-headline-md text-tertiary text-lg mb-1">Navane (Foxtail Millet)</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Navane <span className="font-bold text-secondary">improves digestion</span> and is a powerhouse of antioxidants. It helps in detoxifying the body and boosting immunity.
              </p>
              <div className="mt-sm flex flex-wrap gap-2">
                <span className="bg-secondary-container px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container font-medium">B-Vitamins</span>
                <span className="bg-secondary-container px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container font-medium">Low GI</span>
              </div>
            </div>
          </div>

          {/* Fact Card 3: Gluten-Free/Heart Healthy */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm flex gap-md items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div>
              <h3 className="font-headline-md text-primary text-lg mb-1">Universal Benefits</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                All Siri-Dhanya millets are <span className="font-bold text-secondary">gluten-free</span> and <span className="font-bold text-secondary">heart-healthy</span>. They contain essential minerals like magnesium and phosphorus.
              </p>
              <div className="mt-sm flex flex-wrap gap-2">
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-label-sm text-outline font-medium border border-outline-variant">Weight Loss</span>
                <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-label-sm text-outline font-medium border border-outline-variant">Non-Acidic</span>
              </div>
            </div>
          </div>

          {/* Fact Card 4: Sajje */}
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm flex gap-md items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>energy_savings_leaf</span>
            </div>
            <div>
              <h3 className="font-headline-md text-tertiary text-lg mb-1">Sajje (Pearl Millet)</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Excellent source of <span className="font-bold text-secondary">energy</span> during hot summers. High in protein and phosphorus, supporting healthy hair and skin.
              </p>
              <div className="mt-sm flex flex-wrap gap-2">
                <span className="bg-secondary-container px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container font-medium">Protein Power</span>
                <span className="bg-secondary-container px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container font-medium">Omega-3</span>
              </div>
            </div>
          </div>

          {/* Informative Note */}
          <div className="bg-secondary-container/30 p-md rounded-xl border-l-4 border-secondary mt-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">info</span>
              <p className="font-label-lg text-on-secondary-container">Expert Tip</p>
            </div>
            <p className="text-on-surface-variant font-body-md italic">
              "Soaking millets for 4-6 hours before cooking enhances nutrient absorption and makes them easier to digest."
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HealthBenefits;
