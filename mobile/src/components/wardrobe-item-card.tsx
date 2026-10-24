import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { itemSubtitle, itemTitle } from '@/lib/wardrobe';
import type { WardrobeItem } from '@/types/api';

interface WardrobeItemCardProps {
  item: WardrobeItem;
  layout?: 'grid' | 'list';
  onPress: () => void;
  onToggleFavorite: () => void;
}

function FavoriteButton({ item, onPress }: Pick<WardrobeItemCardProps, 'item' | 'onPress'> & { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
      className="h-8 w-8 items-center justify-center rounded-full bg-background/70">
      <Text className={`text-lg ${item.favorite ? 'text-accent' : 'text-ink'}`}>
        {item.favorite ? '♥' : '♡'}
      </Text>
    </Pressable>
  );
}

export function WardrobeItemCard({
  item,
  layout = 'grid',
  onPress,
  onToggleFavorite,
}: WardrobeItemCardProps) {
  if (layout === 'list') {
    return (
      <Pressable
        onPress={onPress}
        className="flex-row items-center gap-4 rounded-2xl border border-line bg-surface p-3 active:bg-surface-alt">
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 64, height: 80, borderRadius: 12 }}
          contentFit="cover"
          transition={150}
        />
        <View className="flex-1 gap-1">
          <Text numberOfLines={1} className="font-display text-base font-semibold text-ink">
            {itemTitle(item)}
          </Text>
          <Text numberOfLines={1} className="text-sm text-muted">
            {itemSubtitle(item)}
          </Text>
          <Text className="text-xs text-muted">
            Worn {item.wearCount} {item.wearCount === 1 ? 'time' : 'times'}
          </Text>
        </View>
        <FavoriteButton item={item} onPress={onToggleFavorite} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className="flex-1">
      <View className="overflow-hidden rounded-2xl border border-line bg-surface" style={{ aspectRatio: 3 / 4 }}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={150}
        />
        <View className="absolute right-2 top-2">
          <FavoriteButton item={item} onPress={onToggleFavorite} />
        </View>
        {item.wearCount > 0 ? (
          <View className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5">
            <Text className="text-[10px] text-ink">Worn {item.wearCount}×</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} className="mt-2 font-display text-sm font-semibold text-ink">
        {itemTitle(item)}
      </Text>
      <Text numberOfLines={1} className="text-xs text-muted">
        {itemSubtitle(item)}
      </Text>
    </Pressable>
  );
}
