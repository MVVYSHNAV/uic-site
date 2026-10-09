'use client';

import { useRef, useState } from 'react';
import { projects } from '@/data/projects';

export function PortfolioSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(projects[0]);
  function openProject(index: number) {
    setSelected(projects[index]);
    dialogRef.current?.showModal();
  }
  function closeProject() {
    dialogRef.current?.close();
  }
  return (
    <>
      <section className="work section" id="work">
        <div className="section-kicker">
          <span>02 / SELECTED DIRECTIONS</span>
          <span>CONCEPT STUDIES — NOT CLIENT PROJECTS</span>
        </div>
        <div className="section-heading">
          <h2>
            Proof of
            <br />
            <em>possibility.</em>
          </h2>
          <p>
            A glimpse of the worlds we can build.
            <br />
            Every direction starts with a distinct point of view.
          </p>
        </div>
        <div className="work-grid">
          <button className="project project-a" onClick={() => openProject(0)}>
            <div className="project-art">
              <span className="mock-nav">
                FORMA® <small>SPACES FOR LIVING</small>
              </span>
              <div className="architecture">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <strong>
                Room for
                <br />a new perspective.
              </strong>
              <span className="project-arrow">↗</span>
            </div>
            <div className="project-caption">
              <h3>Forma — a quieter kind of bold</h3>
              <span>BRAND STRATEGY / DIGITAL</span>
            </div>
          </button>
          <button className="project project-b" onClick={() => openProject(1)}>
            <div className="project-art">
              <div className="nfc-mock">
                <span>uic / connect</span>
                <strong>
                  One tap.
                  <br />
                  Every possibility.
                </strong>
                <span className="contactless">)))</span>
                <small>YOUR WORLD, CONNECTED.</small>
              </div>
              <span className="project-arrow">↗</span>
            </div>
            <div className="project-caption">
              <h3>Connect — beyond the business card</h3>
              <span>NFC / CONNECTED EXPERIENCES</span>
            </div>
          </button>
          <button className="project project-c" onClick={() => openProject(2)}>
            <div className="project-art">
              <div className="dashboard">
                <div className="dash-sidebar">
                  flow
                  <span>
                    ◉<br />▦<br />↗<br />◎
                  </span>
                </div>
                <div className="dash-content">
                  <small>WORKSPACE OVERVIEW</small>
                  <h4>A clearer picture.</h4>
                  <div className="dash-metrics">
                    <span>
                      Operations
                      <br />
                      <b>Connected</b>
                    </span>
                    <span>
                      Workflow
                      <br />
                      <b>In sync ↗</b>
                    </span>
                  </div>
                  <div className="dash-chart">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </div>
              <span className="project-arrow">↗</span>
            </div>
            <div className="project-caption">
              <h3>Flow — clarity in the everyday</h3>
              <span>ERP / PRODUCT DESIGN</span>
            </div>
          </button>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        id="project-dialog"
        aria-labelledby="project-title"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            closeProject();
        }}
      >
        <button className="dialog-close" aria-label="Close project" onClick={closeProject}>
          ×
        </button>
        <span className="eyebrow">CONCEPT STUDY</span>
        <h2 id="project-title">{selected.title}</h2>
        <p>{selected.description}</p>
        <div className="project-tags">{selected.tags}</div>
        <a className="pill" href="#contact" onClick={closeProject}>
          Build something like this ↗
        </a>
      </dialog>
    </>
  );
}
