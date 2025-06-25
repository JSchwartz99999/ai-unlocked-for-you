
// A/B Testing utilities
interface ABTest {
  id: string;
  name: string;
  variants: Array<{
    id: string;
    name: string;
    weight: number;
  }>;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
}

interface ABTestResult {
  testId: string;
  variantId: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
}

class ABTestingManager {
  private tests: Map<string, ABTest> = new Map();
  private userAssignments: Map<string, string> = new Map();

  registerTest(test: ABTest): void {
    this.tests.set(test.id, test);
  }

  getVariant(testId: string, userId?: string): string | null {
    const test = this.tests.get(testId);
    if (!test || !test.isActive) return null;

    // Check if user is already assigned
    const assignmentKey = `${testId}_${userId || 'anonymous'}`;
    const existingAssignment = this.userAssignments.get(assignmentKey);
    if (existingAssignment) return existingAssignment;

    // Assign user to variant based on weights
    const variants = test.variants;
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        this.userAssignments.set(assignmentKey, variant.id);
        
        // Track assignment
        this.trackAssignment(testId, variant.id, userId);
        
        return variant.id;
      }
    }

    // Fallback to first variant
    const fallbackVariant = variants[0]?.id || null;
    if (fallbackVariant) {
      this.userAssignments.set(assignmentKey, fallbackVariant);
    }
    
    return fallbackVariant;
  }

  trackConversion(testId: string, variantId: string, conversionType: string, value?: number): void {
    const result: ABTestResult = {
      testId,
      variantId,
      sessionId: localStorage.getItem('session_id') || 'unknown',
      timestamp: Date.now()
    };

    console.log('A/B Test Conversion:', {
      ...result,
      conversionType,
      value
    });

    // In production, send to analytics service
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('ab_test_conversion', {
        ...result,
        conversionType,
        value
      });
    }
  }

  private trackAssignment(testId: string, variantId: string, userId?: string): void {
    const result: ABTestResult = {
      testId,
      variantId,
      userId,
      sessionId: localStorage.getItem('session_id') || 'unknown',
      timestamp: Date.now()
    };

    console.log('A/B Test Assignment:', result);

    // In production, send to analytics service
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('ab_test_assignment', result);
    }
  }

  isInVariant(testId: string, variantId: string, userId?: string): boolean {
    const assignedVariant = this.getVariant(testId, userId);
    return assignedVariant === variantId;
  }

  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(test => test.isActive);
  }
}

// Global A/B testing manager
export const abTestManager = new ABTestingManager();

// Example test registration
abTestManager.registerTest({
  id: 'hero_cta_test',
  name: 'Hero CTA Button Test',
  variants: [
    { id: 'control', name: 'Start Learning Today', weight: 50 },
    { id: 'variant_a', name: 'Begin Your AI Journey', weight: 50 }
  ],
  isActive: true,
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
});

// Utility hook for React components
export const useABTest = (testId: string, userId?: string) => {
  const variant = abTestManager.getVariant(testId, userId);
  
  const trackConversion = (conversionType: string, value?: number) => {
    if (variant) {
      abTestManager.trackConversion(testId, variant, conversionType, value);
    }
  };

  return { variant, trackConversion };
};
