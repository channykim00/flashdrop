const showNotification = (title, message, handleClick) => {
  const notification = new Notification(title, { body: message });

  notification.onclick = () => {
    if (typeof handleClick === "function") {
      handleClick();
    }
  };
};

export default showNotification;
