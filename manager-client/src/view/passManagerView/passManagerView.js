import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import service from "../../store/passManagerStore/serviceStore";
import password from "../../store/passManagerStore/passwordStore";

import "./passManagerView.css";
import Header from "../../components/header/header";

const PassManagerView = () => {
  // сервис store
  const {
    services,
    isLoadingService,
    getServices,
    createService,
    updateService,
    deleteService,
  } = service;

  // парольный store
  const {
    passwords,
    getPasswords,
    createPassword,
    updatePassword,
    deletePassword,
  } = password;

  // инпуты для сервиса
  const [inputServiceName, setInputServiceName] = useState("");

  // инпуты для паролей
  const [inputPassLogin, setInputPassLogin] = useState("");
  const [inputPassPassword, setInputPassPassword] = useState("");
  const [inputPassDescription, setInputPassDescription] = useState("");

  // храним выбранный сервис
  const [selectedService, setSelectedService] = useState(0);
  // храним выбранный пароль
  const [selectedPassword, setSelectedPassword] = useState(0);

  // загружаем список сервисов при загрузке страницы
  useEffect(() => {
    getServices().then();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // если выбранный сервис меняется, загружаем для него пароли
  useEffect(() => {
    getPasswords(selectedService).then();
  }, [selectedService]); // eslint-disable-line react-hooks/exhaustive-deps

  // блок функций, которые выполняются при нажатие кнопок

  // управление сервисами
  const addServiceClick = async () => {
    await createService(inputServiceName);
    await getServices();

    setSelectedService(0);
    setSelectedPassword(0);
    setInputServiceName("");

    setInputPassLogin("");
    setInputPassPassword("");
    setInputPassDescription("");
  };

  const updateServiceClick = async () => {
    await updateService(selectedService, inputServiceName);
    await getServices();
  };

  const deleteServiceClick = async () => {
    await deleteService(selectedService);
    await getServices();

    setSelectedService(0);
    setSelectedPassword(0);

    setInputServiceName("");

    setInputPassLogin("");
    setInputPassPassword("");
    setInputPassDescription("");
  };

  // управление паролями
  const addPasswordClick = async () => {
    await createPassword(
      inputPassLogin,
      inputPassPassword,
      inputPassDescription,
      selectedService,
    );
    await getPasswords(selectedService);

    setInputPassLogin("");
    setInputPassPassword("");
    setInputPassDescription("");
  };

  const updatePasswordClick = async () => {
    await updatePassword(
      inputPassLogin,
      inputPassPassword,
      inputPassDescription,
      selectedPassword,
    );
    await getPasswords(selectedService);
  };

  const deletePasswordClick = async () => {
    await deletePassword(selectedPassword);
    await getPasswords(selectedService);

    setSelectedPassword(0);

    setInputPassLogin("");
    setInputPassPassword("");
    setInputPassDescription("");
  };

  // если идет загрузка сервисов, показываем заглушку
  if (isLoadingService) {
    return <div>Загрузка</div>;
  }

  // если сервисы загружены, показываем данные
  if (!isLoadingService) {
    return (
      <div className="password-manager">
        <Header />
        <div className="password-manager__content">
          <div className="service">
            <div className="service__control">
              <input
                className="input-standard"
                placeholder="Добавить сервис"
                onChange={(event) => {
                  setInputServiceName(event.target.value);
                }}
                value={inputServiceName}
              />
              <div className="service__control__button-block">
                <button
                  className="button-standard green"
                  onClick={addServiceClick}
                >
                  Создать
                </button>
                <button
                  className="button-standard blue"
                  onClick={updateServiceClick}
                >
                  Изменить
                </button>
                <button
                  className="button-standard red"
                  onClick={deleteServiceClick}
                >
                  Удалить
                </button>
              </div>
            </div>
            <div className="service__list">
              {services
                .slice()
                .sort(function (a, b) {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })
                .map((el) => (
                  <div
                    key={el.id}
                    className={`service__list__element ${
                      el.id === selectedService
                        ? "service__list__element__pressed"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedService(el.id);
                      setSelectedPassword(0);

                      setInputServiceName(el.name);

                      setInputPassLogin("");
                      setInputPassPassword("");
                      setInputPassDescription("");
                    }}
                  >
                    {el.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="password">
            <div className="password__control">
              <input
                className="input-standard"
                placeholder="Имя пользователя"
                onChange={(event) => {
                  setInputPassLogin(event.target.value);
                }}
                value={inputPassLogin}
              />
              <input
                className="input-standard"
                placeholder="Пароль"
                onChange={(event) => {
                  setInputPassPassword(event.target.value);
                }}
                value={inputPassPassword}
              />
              <input
                className="input-standard"
                placeholder="Описание"
                onChange={(event) => {
                  setInputPassDescription(event.target.value);
                }}
                value={inputPassDescription}
              />
              <div className="password__control__button-block">
                <button
                  className="button-standard green"
                  onClick={addPasswordClick}
                >
                  Создать
                </button>
                <button
                  className="button-standard blue"
                  onClick={updatePasswordClick}
                >
                  Изменить
                </button>
                <button
                  className="button-standard red"
                  onClick={deletePasswordClick}
                >
                  Удалить
                </button>
              </div>
            </div>
            <table className="password__list">
              <thead>
                <tr>
                  <th></th>
                  <th>Имя пользователя</th>
                  <th>Пароль</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tbody>
                {passwords
                  .slice()
                  .sort(function (a, b) {
                    if (a.login < b.login) {
                      return -1;
                    }
                    if (a.login > b.login) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((el) => (
                    <tr key={`pass${el.id}`}>
                      <td>
                        <input
                          className="checkbox"
                          type="checkbox"
                          onClick={() => {
                            setSelectedPassword(el.id);
                            setInputPassLogin(el.login);
                            setInputPassPassword(el.password);
                            setInputPassDescription(el.description);
                          }}
                          checked={el.id === selectedPassword}
                        />
                      </td>
                      <td>
                        <button
                          className="button-copy"
                          onClick={() => {
                            navigator.clipboard.writeText(el.login).then();
                          }}
                        ></button>
                        {el.login}
                      </td>
                      <td>
                        <button
                          className="button-copy"
                          onClick={() => {
                            navigator.clipboard.writeText(el.password).then();
                          }}
                        ></button>
                        {el.password}
                      </td>
                      <td>{el.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default observer(PassManagerView);
