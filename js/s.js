(function (w, d) {
    zaraz.debug = (fw = "") => {
      document.cookie = `zarazDebug=${fw}; path=/`;
      location.reload();
    };
    window.zaraz._al = function (dY, dZ, d$) {
      w.zaraz.listeners.push({ item: dY, type: dZ, callback: d$ });
      dY.addEventListener(dZ, d$);
    };
    zaraz.preview = (eP = "") => {
      document.cookie = `zarazPreview=${eP}; path=/`;
      location.reload();
    };
    zaraz.i = function (fo) {
      const fp = d.createElement("div");
      fp.innerHTML = unescape(fo);
      const fq = fp.querySelectorAll("script");
      for (let fr = 0; fr < fq.length; fr++) {
        const fs = d.createElement("script");
        fq[fr].innerHTML && (fs.innerHTML = fq[fr].innerHTML);
        for (const ft of fq[fr].attributes) fs.setAttribute(ft.name, ft.value);
        d.head.appendChild(fs);
        fq[fr].remove();
      }
      d.body.appendChild(fp);
    };
    zaraz.f = async function (eM, eN) {
      const eO = { credentials: "include", keepalive: !0, mode: "no-cors" };
      if (eN) {
        eO.method = "POST";
        eO.body = new URLSearchParams(eN);
        eO.headers = { "Content-Type": "application/x-www-form-urlencoded" };
      }
      return await fetch(eM, eO);
    };
    window.zaraz._p = async (bn) =>
      new Promise((bo) => {
        if (bn) {
          bn.e &&
            bn.e.forEach((bp) => {
              try {
                new Function(bp)();
              } catch (bq) {
                console.error(`Error executing script: ${bp}\n`, bq);
              }
            });
          Promise.allSettled((bn.f || []).map((br) => fetch(br[0], br[1])));
        }
        bo();
      });
    zaraz.pageVariables = {};
    zaraz.__zcl = zaraz.__zcl || {};
    zaraz.track = async function (eT, eU, eV) {
      return new Promise((eW, eX) => {
        const eY = { name: eT, data: {} };
        for (const eZ of [localStorage, sessionStorage])
          Object.keys(eZ || {})
            .filter((fa) => fa.startsWith("_zaraz_"))
            .forEach((e$) => {
              try {
                eY.data[e$.slice(7)] = JSON.parse(eZ.getItem(e$));
              } catch {
                eY.data[e$.slice(7)] = eZ.getItem(e$);
              }
            });
        Object.keys(zaraz.pageVariables).forEach(
          (fb) => (eY.data[fb] = JSON.parse(zaraz.pageVariables[fb]))
        );
        Object.keys(zaraz.__zcl).forEach(
          (fc) => (eY.data[`__zcl_${fc}`] = zaraz.__zcl[fc])
        );
        eY.data.__zarazMCListeners = zaraz.__zarazMCListeners;
        //
        eY.data = { ...eY.data, ...eU };
        eY.zarazData = zarazData;
        fetch("/cdn-cgi/zaraz/t", {
          credentials: "include",
          keepalive: !0,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eY),
        })
          .catch(() => {
            //
            return fetch("/cdn-cgi/zaraz/t", {
              credentials: "include",
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(eY),
            });
          })
          .then(function (fe) {
            zarazData._let = new Date().getTime();
            fe.ok || eX();
            return 204 !== fe.status && fe.json();
          })
          .then(async (fd) => {
            await zaraz._p(fd);
            "function" == typeof eV && eV();
          })
          .finally(() => eW());
      });
    };
    zaraz.set = function (ff, fg, fh) {
      try {
        fg = JSON.stringify(fg);
      } catch (fi) {
        return;
      }
      prefixedKey = "_zaraz_" + ff;
      sessionStorage && sessionStorage.removeItem(prefixedKey);
      localStorage && localStorage.removeItem(prefixedKey);
      delete zaraz.pageVariables[ff];
      if (void 0 !== fg) {
        fh && "session" == fh.scope
          ? sessionStorage && sessionStorage.setItem(prefixedKey, fg)
          : fh && "page" == fh.scope
          ? (zaraz.pageVariables[ff] = fg)
          : localStorage && localStorage.setItem(prefixedKey, fg);
        zaraz.__watchVar = { key: ff, value: fg };
      }
    };
    for (const { m: fj, a: fk } of zarazData.q.filter(({ m: fl }) =>
      ["debug", "set"].includes(fl)
    ))
      zaraz[fj](...fk);
    for (const { m: fm, a: fn } of zaraz.q) zaraz[fm](...fn);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function (dz, dA, dB, dC) {
      zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
      zaraz.__zarazTriggerMap[dz] || (zaraz.__zarazTriggerMap[dz] = "");
      zaraz.__zarazTriggerMap[dz] += "*" + dA + "*";
      zaraz.track(
        "__zarazEmpty",
        { ...dB, __zarazClientTriggers: zaraz.__zarazTriggerMap[dz] },
        dC
      );
    };
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = (fS) => {
      for (const fT of Object.entries(fS))
        zaraz.set(fT[0], fT[1], { scope: "page" });
      if (fS.event) {
        if (
          zarazData.dataLayerIgnore &&
          zarazData.dataLayerIgnore.includes(fS.event)
        )
          return;
        let fU = {};
        for (let fV of dataLayer.slice(0, dataLayer.indexOf(fS) + 1))
          fU = { ...fU, ...fV };
        delete fU.event;
        fS.event.startsWith("gtm.") || zaraz.track(fS.event, fU);
      }
    };
    const fR = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
      configurable: !0,
      enumerable: !1,
      writable: !0,
      value: function (...fW) {
        let fX = fR.apply(this, fW);
        zaraz._processDataLayer(fW[0]);
        return fX;
      },
    });
    dataLayer.forEach((fY) => zaraz._processDataLayer(fY));
    zaraz._cts = () => {
      zaraz._timeouts && zaraz._timeouts.forEach((c$) => clearTimeout(c$));
      zaraz._timeouts = [];
    };
    zaraz._rl = function () {
      w.zaraz.listeners &&
        w.zaraz.listeners.forEach((da) =>
          da.item.removeEventListener(da.type, da.callback)
        );
      window.zaraz.listeners = [];
    };
    history.pushState = function () {
      try {
        zaraz._rl();
        zaraz._cts && zaraz._cts();
      } finally {
        History.prototype.pushState.apply(history, arguments);
        setTimeout(() => {
          zarazData.l = d.location.href;
          zarazData.t = d.title;
          zaraz.pageVariables = {};
          zaraz.__zarazMCListeners = {};
          zaraz.track("__zarazSPA");
        }, 100);
      }
    };
    history.replaceState = function () {
      try {
        zaraz._rl();
        zaraz._cts && zaraz._cts();
      } finally {
        History.prototype.replaceState.apply(history, arguments);
        setTimeout(() => {
          zarazData.l = d.location.href;
          zarazData.t = d.title;
          zaraz.pageVariables = {};
          zaraz.track("__zarazSPA");
        }, 100);
      }
    };
    zaraz._c = (cX) => {
      const { event: cY, ...cZ } = cX;
      zaraz.track(cY, { ...cZ, __zarazClientEvent: !0 });
    };
    zaraz._syncedAttributes = [
      "altKey",
      "clientX",
      "clientY",
      "pageX",
      "pageY",
      "button",
    ];
    zaraz.__zcl.track = !0;
    zaraz._p({
      e: [
        '(function(w,d){w.zarazData.executed.push("Pageview");})(window,document)',
      ],
    });
  })(window, document);
  