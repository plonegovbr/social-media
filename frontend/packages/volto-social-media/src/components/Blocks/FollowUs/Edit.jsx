import React from 'react';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { useNetworks } from '@plonegovbr/volto-social-media/hooks/useNetworks';
import Data from './Data';
import View from './View';

const Edit = (props) => {
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
