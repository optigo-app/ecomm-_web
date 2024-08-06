import "./ChatMenu.modul.scss";

const ChatMenu = () => {

    const whatsappUrl = `https://web.whatsapp.com/send?phone=9099889962&text=Hello, Talk to a Jewellery expert now!`;
  return (
    <div className="hoq_main_ChatMenu">
      <button className="wa">
        <a
          href={whatsappUrl}
          target="_blank"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
            alt=""
          />
        </a>
      </button>
    </div>
  );
};

export default ChatMenu;
