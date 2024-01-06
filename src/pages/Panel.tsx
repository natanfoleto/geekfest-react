import DefaultLayout from "../layouts/Default";

import { Tabs } from "../components/Tabs";
import { TabUser } from "../components/TabUser";
import { TabGroup } from "../components/TabGroup";
import { TabEvent } from "../components/TabEvent";
import { TabQuest } from "../components/TabQuest";
import { TabGame } from "../components/TabGame";
import { TabAttraciton } from "../components/TabAttraction";
import { TabPermission } from "../components/TabPermission";
import { PermissionGate } from "../components/PermissionGate";

import styles from "./Panel.module.css";
import { useState } from "react";

enum Pages {
  TabUser,
  TabGroup,
  TabEvent,
  TabQuest,
  TabGame,
  TabAttraciton,
  TabPermission,
}

function Panel() {
  const [currentTab, setCurrentTab] = useState<Pages>(Pages.TabUser);

  function handleSetTab(tab: number) {
    setCurrentTab(tab);
  }

  return (
    <DefaultLayout buttonPanel={false}>
      <PermissionGate permissions={["admin-panel"]} isPage>
        <div className={styles.container}>
          <Tabs
            buttons={[
              "Usuários",
              "Grupos",
              "Eventos",
              "Missões",
              "Sala de Jogos",
              "Atrações",
              "Permissões",
            ]}
            onClick={handleSetTab}
            currentTab={currentTab}
          >
            {currentTab === Pages.TabUser && <TabUser />}
            {currentTab === Pages.TabGroup && <TabGroup />}
            {currentTab === Pages.TabEvent && <TabEvent />}
            {currentTab === Pages.TabQuest && <TabQuest />}
            {currentTab === Pages.TabGame && <TabGame />}
            {currentTab === Pages.TabAttraciton && <TabAttraciton />}
            {currentTab === Pages.TabPermission && <TabPermission />}
          </Tabs>
        </div>
      </PermissionGate>
    </DefaultLayout>
  );
}

export default Panel;
