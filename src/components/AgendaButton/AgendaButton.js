import "./AgendaButton.css";

export default function AgendaButton() {

  const openCalendly = () => {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/cortinaslenox/30min?locale=es&hide_landing_page_details=1"
    });

    return false;
  };

  return (
    <div className="agenda-container">
      <button
        className="agenda-btn"
        onClick={openCalendly}
      >
        📅 Agendar visita
      </button>
    </div>
  );
}