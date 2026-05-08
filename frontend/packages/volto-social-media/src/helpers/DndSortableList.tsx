import React, { useMemo } from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

export type DndSortableListProps = {
  items: Array<Record<string, any>>;
  handleDragEnd: (event: any) => void;
  activeObject?: number;
  setActiveObject?: (index: number) => void;
  children: (props: {
    item: Record<string, any>;
    uid: string;
    index: number;
    attributes: any;
    listeners: any;
  }) => React.ReactNode;
  dndKitCore?: any;
  dndKitSortable?: any;
  dndKitUtilities?: any;
};

interface SortableItemWrapperProps {
  id: string;
  item: Record<string, any>;
  index: number;
  children: (props: {
    item: Record<string, any>;
    uid: string;
    index: number;
    attributes: any;
    listeners: any;
  }) => React.ReactNode;
  dndKitSortable?: any;
  dndKitUtilities?: any;
}

function SortableItemWrapper({
  id,
  item,
  index,
  children,
  dndKitSortable,
  dndKitUtilities,
}: SortableItemWrapperProps): React.ReactElement {
  const { useSortable } = dndKitSortable;
  const { CSS } = dndKitUtilities;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({
        item,
        uid: id,
        index,
        attributes,
        listeners,
      })}
    </div>
  );
}

const SortableItemWrapperWithLibs = injectLazyLibs([
  'dndKitSortable',
  'dndKitUtilities',
])(SortableItemWrapper);

interface ItemId {
  id: string;
  item: Record<string, any>;
  index: number;
}

function DndSortableListComponent({
  items,
  handleDragEnd,
  children,
  dndKitCore,
  dndKitSortable,
  dndKitUtilities,
}: DndSortableListProps): React.ReactElement {
  const { DndContext, closestCenter } = dndKitCore || {};
  const { SortableContext, verticalListSortingStrategy } = dndKitSortable || {};

  // Create unique IDs for items - prefer @id if available
  const itemIds = useMemo<ItemId[]>(
    () =>
      items.map((item, index) => {
        const uniqueId = item['@id'] || `item-${index}`;
        return {
          id: uniqueId,
          item,
          index,
        };
      }),
    [items],
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={itemIds.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {itemIds.map(({ id, item, index }) => (
          <SortableItemWrapperWithLibs
            key={id}
            id={id}
            item={item}
            index={index}
            children={children}
            dndKitSortable={dndKitSortable}
            dndKitUtilities={dndKitUtilities}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default injectLazyLibs([
  'dndKitCore',
  'dndKitSortable',
  'dndKitUtilities',
])(DndSortableListComponent);
