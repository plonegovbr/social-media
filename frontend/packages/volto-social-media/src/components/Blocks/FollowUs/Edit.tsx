import React from 'react';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { useNetworks } from '../../../hooks/useNetworks';
import Data from './Data';
import View from './View';
import type { FollowUsBlockData } from '../../../types';

export interface FollowUsEditProps {
  data: FollowUsBlockData;
  block: string;
  onChangeBlock: (block: string, data: FollowUsBlockData) => void;
  selected: boolean;
  [key: string]: unknown;
}

const Edit: React.FC<FollowUsEditProps> = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const networks = useNetworks();
  return (
    <>
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <Data
          {...props}
          networks={networks}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
