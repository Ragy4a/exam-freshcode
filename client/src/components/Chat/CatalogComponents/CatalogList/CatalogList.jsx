import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';
import {
  changeShowModeCatalog,
  deleteCatalog,
} from '../../../../store/slices/chatSlice';

const CatalogList = () => {
  const dispatch = useDispatch();
  const catalogList = useSelector((state) => state.chatStore.catalogList);

  const goToCatalog = (event, catalog) => {
    dispatch(changeShowModeCatalog(catalog));
    event.stopPropagation();
  };

  const handleDeleteCatalog = (event, catalogId) => {
    dispatch(deleteCatalog({ catalogId }));
    event.stopPropagation();
  };

  const getListCatalog = () => {
    return catalogList.length ? (
      catalogList.map((catalog) => (
        <Catalog
          catalog={catalog}
          key={catalog._id}
          deleteCatalog={handleDeleteCatalog}
          goToCatalog={goToCatalog}
        />
      ))
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  return <div className={styles.listContainer}>{getListCatalog()}</div>;
};

export default CatalogList;