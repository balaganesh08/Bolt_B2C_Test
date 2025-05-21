import React from "react";
import { Sidebar } from "../../../components/layout/Sidebar";
import { DealsHeader } from "./dealComponents/DealsHeader";
import { DealsFilterBar } from "./dealComponents/DealsFilterBar";
import { DealsTable } from "./dealComponents/DealsTable";
import { DealsPagination } from "./dealComponents/DealsPagination";
import styles from "./styles.module.css";

export const DealsPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <DealsHeader />
        <div className={styles.mainContent}>
          <DealsFilterBar />
          <DealsTable />
          <DealsPagination />
        </div>
      </div>
    </div>
  );
};
