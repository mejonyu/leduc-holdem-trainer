import * as Haptics from 'expo-haptics'

export const triggerButtonHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const triggerErrorHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}