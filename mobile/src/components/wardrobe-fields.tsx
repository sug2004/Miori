import { Pressable, Text, View } from 'react-native';

import { FormField } from '@/components/form-field';
import {
  FORMALITY_OPTIONS,
  SEASON_OPTIONS,
  WARDROBE_CATEGORIES,
  type WardrobeFormValue,
} from '@/lib/wardrobe';

interface WardrobeFieldsProps {
  value: WardrobeFormValue;
  onChange: (next: WardrobeFormValue) => void;
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-1.5 ${
        active ? 'border-accent bg-accent-soft' : 'border-line bg-surface active:bg-surface-alt'
      }`}>
      <Text className={`text-xs font-medium ${active ? 'text-accent' : 'text-muted'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export function WardrobeFields({ value, onChange }: WardrobeFieldsProps) {
  const set = <K extends keyof WardrobeFormValue>(key: K, next: WardrobeFormValue[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <View className="gap-4">
      <View className="gap-2">
        <Text className="text-sm font-medium text-ink">Category</Text>
        <View className="flex-row flex-wrap gap-2">
          {WARDROBE_CATEGORIES.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              active={value.category === option.value}
              onPress={() => set('category', option.value)}
            />
          ))}
        </View>
      </View>

      <FormField
        label="Subcategory"
        value={value.subcategory}
        onChangeText={(text) => set('subcategory', text)}
        placeholder="shirt, jeans, sneakers..."
        autoCapitalize="none"
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField
            label="Color"
            value={value.color}
            onChangeText={(text) => set('color', text)}
            placeholder="white"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-1">
          <FormField
            label="Brand"
            value={value.brand}
            onChangeText={(text) => set('brand', text)}
            placeholder="Zara"
            autoCapitalize="words"
          />
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField
            label="Material"
            value={value.material}
            onChangeText={(text) => set('material', text)}
            placeholder="cotton"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-1">
          <FormField
            label="Pattern"
            value={value.pattern}
            onChangeText={(text) => set('pattern', text)}
            placeholder="solid"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField
            label="Fit"
            value={value.fit}
            onChangeText={(text) => set('fit', text)}
            placeholder="regular"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-1">
          <FormField
            label="Price"
            value={value.price}
            onChangeText={(text) => set('price', text)}
            placeholder="49.90"
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-ink">Formality</Text>
        <View className="flex-row flex-wrap gap-2">
          {FORMALITY_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              active={value.formality === option}
              onPress={() => set('formality', value.formality === option ? '' : option)}
            />
          ))}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-ink">Season</Text>
        <View className="flex-row flex-wrap gap-2">
          {SEASON_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              active={value.season === option}
              onPress={() => set('season', value.season === option ? '' : option)}
            />
          ))}
        </View>
      </View>

      <FormField
        label="Style tags"
        value={value.styleTags}
        onChangeText={(text) => set('styleTags', text)}
        placeholder="minimal, casual, streetwear"
        autoCapitalize="none"
      />

      <FormField
        label="Secondary colors"
        value={value.secondaryColors}
        onChangeText={(text) => set('secondaryColors', text)}
        placeholder="navy, grey"
        autoCapitalize="none"
      />

      <FormField
        label="Image URL"
        value={value.imageUrl}
        onChangeText={(text) => set('imageUrl', text)}
        placeholder="https://..."
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormField
        label="Notes"
        value={value.notes}
        onChangeText={(text) => set('notes', text)}
        placeholder="Anything worth remembering..."
        multiline
        style={{ minHeight: 96, textAlignVertical: 'top' }}
      />
    </View>
  );
}
