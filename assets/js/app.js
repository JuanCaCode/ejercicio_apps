// Simple hash-router with in-memory mock data
(function () {
  const app = document.getElementById("app");

  const routes = {
    "#/login": renderLogin,
    "#/menu": renderMenu,
    "#/consulta": renderConsulta,
    "#/manifiesto": renderManifiesto,
    "#/exito": renderExito,
  };

  const mockManifiesto = {
    numero: "634534",
    origen: "Bogotá",
    destino: "Bucaramanga",
    tiempos: {
      inicioCarga: "Feb 28, 2023 12:30",
      finCarga: "Feb 28, 2023 12:30",
      inicioDescarga: "Feb 28, 2023 12:30",
      finDescarga: "Feb 28, 2023 12:30",
    },
  };

  function navigate(hash) {
    window.location.hash = hash;
  }

  function renderLogin() {
    app.innerHTML = `
      <div class="card">
        <div class="h1 center">Iniciar Sesión</div>
        <div class="space-16"></div>
        <div class="input-row">
          <input id="email" type="email" class="input" placeholder="Correo Electronico" />
          <input id="password" type="password" class="input" placeholder="Contraseña" />
        </div>
        <div class="space-16"></div>
        <button id="loginBtn" class="btn btn-primary">Continuar</button>
      </div>
    `;
    document.getElementById("loginBtn").addEventListener("click", () => {
      // Minimal validation
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value.trim();
      if (!email || !pass) {
        alert("Por favor ingrese correo y contraseña");
        return;
      }
      navigate("#/menu");
    });
  }

  function renderMenu() {
    app.innerHTML = `
      <div class="h1">¡Hola, Juan!</div>
      <div class="card">
        <button class="menu-btn" id="btnVehiculo">
          <img class="icon" src="assets/icons/dashboard_GPS.svg" alt="Ubicación" />
          <span>Ubicación del Vehículo</span>
          <span class="chev">›</span>
        </button>
        <button class="menu-btn" id="btnRuta" style="margin-top: 14px;">
          <img class="icon" src="assets/icons/dashboard_events.svg" alt="Eventos" />
          <span>Programación y Eventos en la Ruta</span>
          <span class="chev">›</span>
        </button>
      </div>
    `;
    document.getElementById("btnVehiculo").addEventListener("click", () => {
      alert("Funcionalidad de ubicación en prototipo.");
    });
    document.getElementById("btnRuta").addEventListener("click", () => {
      navigate("#/consulta");
    });
  }

  function renderConsulta() {
    app.innerHTML = `
      <div class="card">
        <div class="h1">Consultar por placa</div>
        <input id="placa" class="input" placeholder="Ingresar Placa" />
        <div class="space-16"></div>
        <button id="consultarBtn" class="btn btn-primary">Consultar</button>
      </div>
    `;
    document.getElementById("consultarBtn").addEventListener("click", () => {
      const placa = document.getElementById("placa").value.trim();
      if (!placa) {
        alert("Ingrese una placa para consultar.");
        return;
      }
      // Simulate fetch
      setTimeout(() => {
        window.sessionStorage.setItem("placa", placa);
        navigate("#/manifiesto");
      }, 300);
    });
  }

  function renderManifiesto() {
    const placa = window.sessionStorage.getItem("placa") || "ABC123";
    app.innerHTML = `
      <div class="card">
        <div class="h1">Manifiesto</div>
        <div class="text-muted small">N° Manifiesto: ${mockManifiesto.numero}</div>
        <div class="text-muted small">Origen: ${mockManifiesto.origen}</div>
        <div class="text-muted small">Destino: ${mockManifiesto.destino}</div>
        <div class="hr"></div>
        <div class="h2">Seleccionar tiempos:</div>
        <label class="small">Fecha y hora de inicio de carga:</label>
        <input id="inicioCarga" class="input" value="${mockManifiesto.tiempos.inicioCarga}" />
        <div class="space-16"></div>
        <label class="small">Fecha y hora de fin de carga:</label>
        <input id="finCarga" class="input" value="${mockManifiesto.tiempos.finCarga}" />
        <div class="space-16"></div>
        <label class="small">Fecha y hora de inicio de descarga:</label>
        <input id="inicioDescarga" class="input" value="${mockManifiesto.tiempos.inicioDescarga}" />
        <div class="space-16"></div>
        <label class="small">Fecha y hora de fin de descarga:</label>
        <input id="finDescarga" class="input" value="${mockManifiesto.tiempos.finDescarga}" />
        <div class="space-24"></div>
        <button id="reportarBtn" class="btn btn-primary">Reportar tiempos</button>
      </div>
    `;
    document.getElementById("reportarBtn").addEventListener("click", () => {
      // Simple validation
      const campos = [
        "inicioCarga",
        "finCarga",
        "inicioDescarga",
        "finDescarga",
      ];
      const invalid = campos.some(
        (id) => !document.getElementById(id).value.trim()
      );
      if (invalid) {
        alert("Complete todos los tiempos.");
        return;
      }
      navigate("#/exito");
    });
  }

  function renderExito() {
    app.innerHTML = `
      <div class="card center">
        <div class="success-title">¡Tiempos reportados exitosamente!</div>
        <div class="space-16"></div>
        <div class="success-emoji">✅</div>
        <div class="space-24"></div>
        <button class="btn btn-outline" id="volverBtn">Volver</button>
      </div>
    `;
    document
      .getElementById("volverBtn")
      .addEventListener("click", () => navigate("#/menu"));
  }

  function renderRoute() {
    const hash = window.location.hash || "#/login";
    const view = routes[hash] || renderLogin;
    view();
  }

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
})();
