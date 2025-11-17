#!/bin/bash
components=(
  "AnimatedLazyLoad"
  "BlogCard"
  "ExpertTeam"
  "FaqStyleOne"
  "FaqStyleTwo"
  "FunFactsStyle2"
  "HorizontalScrollCarousel"
  "LatesNews"
  "LatesNewStyleTwo"
  "LazyImage"
  "LazyLoad"
  "LetsGetToWork"
  "LetsTalkArea"
  "PageBanner"
  "Partner"
  "PartnerStyle2"
  "ProtectYourWebsite"
  "ScrollProgress"
  "Skeleton"
  "StaggeredLazyLoad"
  "Testimonials"
  "WhyChooseUsStyleOne"
  "WhyChooseUsStyleTwo"
)

echo "=== USED Components ==="
for comp in "${components[@]}"; do
  if grep -r "from.*['\"].*/${comp}['\"]" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" src/ > /dev/null 2>&1 || \
     grep -r "import.*${comp}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" src/ | grep -v "src/components/Common/${comp}.tsx" > /dev/null 2>&1; then
    echo "✓ $comp"
  fi
done

echo ""
echo "=== UNUSED Components ==="
for comp in "${components[@]}"; do
  if ! grep -r "from.*['\"].*/${comp}['\"]" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" src/ > /dev/null 2>&1 && \
     ! grep -r "import.*${comp}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" src/ | grep -v "src/components/Common/${comp}.tsx" > /dev/null 2>&1; then
    echo "✗ $comp"
  fi
done
