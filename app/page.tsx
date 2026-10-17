"use client";

import { useMemo, useState } from "react";

const example = "";

function Icon({ name }: { name: "spark" | "copy" | "whatsapp" | "arrow" | "check" }) {
  if (name === "spark") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 13 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 14l1 2.8L9 18l-3 1.2L5 22l-1-2.8L1 18l3-1.2L5 14Z" fill="currentColor"/></svg>;
  if (name === "copy") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/></svg>;
  if (name === "check") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>;
  if (name === "arrow") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2a9.9 9.9 0 0 0-8.54 14.9L2 22l5.27-1.38A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.3-.18-3.13.82.84-3.05-.2-.32A8 8 0 1 1 12 20Zm4.4-5.98c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.47-.07 1.43-.59 1.63-1.16.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"/></svg>;
}

export default function Home() {
  const [input, setInput] = useState(example);
  const [copied, setCopied] = useState<string | null>(null);
  const [phone, setPhone] = useState("8883670422");
  const { unique, repeated, total } = useMemo(() => {
    const values = input.trim().split(/[\s,;]+/).filter(Boolean);
    const counts = new Map<string, number>();
    values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
    return {
      unique: values.filter((value) => counts.get(value) === 1),
      repeated: values.filter((value) => (counts.get(value) ?? 0) > 1),
      total: values.length,
    };
  }, [input]);

  async function copyList(which: "unique" | "repeated") {
    const text = (which === "unique" ? unique : repeated).join(", ");
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 1600);
  }

  function handleNumberInput(value: string) {
    setInput(value.replace(/[^\d\s,;]/g, ""));
  }

  function shareList(which: "unique" | "repeated") {
    const values = which === "unique" ? unique : repeated;
    if (!values.length) return;
    const label = which === "unique" ? "One-time numbers" : "Repeated numbers";
    const message = `${label}:\n${values.join(", ")}`;
    const digits = phone.replace(/\D/g, "");
    const whatsappNumber = digits.startsWith("91") ? digits : `91${digits}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.location.assign(url);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Tally home"><span className="brand-mark"><Icon name="spark" /></span><span>tally<span className="brand-dot">.</span></span></a>
        <div className="topbar-note"><span className="live-dot" /> Your numbers stay on this device</div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="eyebrow-line" /> THE LITTLE NUMBER ORGANIZER</div>
        <h1>Make sense of<br />your <span>numbers.</span></h1>
        <p className="hero-copy">Drop in your list. We’ll sort the one-timers from the repeats, ready to copy or send.</p>
      </section>

      <section className="workspace" aria-label="Number organizer">
        <div className="input-card">
          <div className="card-heading"><div><span className="step-label">01 <span>·</span> YOUR LIST</span><h2>Paste your numbers</h2></div><button className="text-button" onClick={() => setInput("")}>Clear all <span>↗</span></button></div>
          <label className="sr-only" htmlFor="number-input">Enter numbers separated by spaces, commas, or new lines</label>
          <textarea id="number-input" value={input} onChange={(event) => handleNumberInput(event.target.value)} placeholder="Enter numbers separated by spaces, commas, or new lines" spellCheck={false} inputMode="text" autoCapitalize="off" autoCorrect="off" />
          <div className="input-footer"><span><span className="keyboard-icon">↵</span> Spaces, commas, or new lines all work</span><span className="input-count">{total} {total === 1 ? "number" : "numbers"}</span></div>
        </div>

        <div className="results-heading"><div><span className="step-label">02 <span>·</span> THE RESULTS</span><h2>Sorted, just like that<span>.</span></h2></div><span className="instant-badge"><Icon name="spark" /> Updates live</span></div>

        <div className="results-grid">
          <article className="result-card unique-card">
            <div className="result-top"><div className="result-icon unique-icon">↗</div><div className="result-number">{unique.length.toString().padStart(2, "0")}</div></div>
            <div className="result-title-row"><h3>One-time numbers</h3><span className="result-pill unique-pill">ONCE</span></div>
            <p className="result-description">Only show up once in your list</p>
            <div className="number-output" aria-live="polite">{unique.length ? unique.join(", ") : <span className="empty-state">Your one-timers will land here</span>}</div>
            <div className="result-actions"><button className="copy-button" onClick={() => copyList("unique")} disabled={!unique.length}><Icon name={copied === "unique" ? "check" : "copy"} />{copied === "unique" ? "Copied" : "Copy list"}</button><button className="send-button" onClick={() => shareList("unique")} disabled={!unique.length}><Icon name="whatsapp" />Send on WhatsApp <Icon name="arrow" /></button></div>
          </article>

          <article className="result-card repeated-card">
            <div className="result-top"><div className="result-icon repeated-icon">⟳</div><div className="result-number">{repeated.length.toString().padStart(2, "0")}</div></div>
            <div className="result-title-row"><h3>Repeated numbers</h3><span className="result-pill repeated-pill">REPEATS</span></div>
            <p className="result-description">Every appearance of a repeated number</p>
            <div className="number-output" aria-live="polite">{repeated.length ? repeated.join(", ") : <span className="empty-state">No repeats found. Nice.</span>}</div>
            <div className="result-actions"><button className="copy-button" onClick={() => copyList("repeated")} disabled={!repeated.length}><Icon name={copied === "repeated" ? "check" : "copy"} />{copied === "repeated" ? "Copied" : "Copy list"}</button><button className="send-button" onClick={() => shareList("repeated")} disabled={!repeated.length}><Icon name="whatsapp" />Send on WhatsApp <Icon name="arrow" /></button></div>
          </article>
        </div>

        <div className="share-note"><span className="note-icon">i</span><span>Your list opens in a WhatsApp chat to +91 8883670422.</span><label className="phone-field"><span>+91</span><input aria-label="WhatsApp phone number" inputMode="tel" placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))} /></label></div>
      </section>

      <footer className="footer"><span>Small tool. Big list energy.</span><span>MADE FOR THE MESSY MIDDLE OF YOUR NOTES</span></footer>
    </main>
  );
}
