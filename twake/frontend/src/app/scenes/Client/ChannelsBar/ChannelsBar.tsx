import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Layout } from 'antd';
import CurrentUser from './Parts/CurrentUser/CurrentUser.js';
import ChannelsApps from './ChannelsApps/ChannelsApps';
import { Workspace } from './Workspace/workspace';
import { ChannelsUser } from './ChannelsUser/ChannelsUser';
import Tutorial from './Parts/Tutorial.js';
import Footer from './Parts/Footer.js';
import RouterServices from 'app/services/RouterService';
import './ChannelsBar.scss';
import Shortcuts, { defaultShortcutsMap, ShortcutType } from 'app/services/ShortcutService';
import ModalManager from 'services/Modal/ModalManager';
import WorkspaceChannelList from './Modals/WorkspaceChannelList';

export default () => {
  const { companyId, workspaceId } = RouterServices.useStateFromRoute();

  const openWorkspaceChannelList: ShortcutType = {
    shortcut: defaultShortcutsMap.SEARCH_CHANNEL,
    handler: (event: any) => {
      event.preventDefault();
      if (ModalManager.isOpen() === false) {
        return ModalManager.open(<WorkspaceChannelList />, {
          position: 'center',
          size: { width: '500px' },
        });
      } else return ModalManager.close();
    },
  };

  useEffect(() => {
    Shortcuts.addShortcut(openWorkspaceChannelList);
    return () => {
      Shortcuts.removeShortcut(openWorkspaceChannelList);
    };
  }, []);

  return (
    <Layout.Sider theme="light" width={220} className="channels_view">
      <CurrentUser />
      {!!companyId && !!workspaceId && (
        <PerfectScrollbar component="div">
          <ChannelsApps key={workspaceId} />
          <Workspace key={'workspace_chans_' + workspaceId} />
          <ChannelsUser key={companyId} />
        </PerfectScrollbar>
      )}
      <Tutorial />
      <Footer />
    </Layout.Sider>
  );
};