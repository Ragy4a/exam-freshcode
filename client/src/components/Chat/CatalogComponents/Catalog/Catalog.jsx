import React from 'react';
import styles from './Catalog.module.sass';

const Catalog = ({ catalog, deleteCatalog, goToCatalog }) => {
  const { catalogName, chats, _id } = catalog;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    deleteCatalog(event, _id);
  };

  const handleGoToCatalogClick = (event) => {
    goToCatalog(event, catalog);
  };

  return (
    <div
      className={styles.catalogContainer}
      onClick={handleGoToCatalogClick}
    >
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i
          className='fas fa-trash-alt'
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default Catalog;