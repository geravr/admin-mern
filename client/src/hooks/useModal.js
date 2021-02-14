import { useState } from "react";

const useModal = () => {
  /*************** States ***************/
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /*************** Functions ***************/
  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return { isModalVisible, showModal, hideModal, isLoading, setIsLoading };
};

export default useModal;
