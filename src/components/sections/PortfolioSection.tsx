'use client';

import { useRef, useState } from 'react';
import { projects, Project } from '@/data/projects';

export function PortfolioSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [filter, setFilter] = useState<'all' | 'client' | 'concept'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.kind === filter;
  });

  function openProject(project: Project) {
    setSelected(project);
    dialogRef.current?.showModal();
  }

  function closeProject() {
    dialogRef.current?.close();
  }

  return (
    <>
      <section className="work section" id="work">
        <div className="section-kicker">
          <span>COMMISSIONED WORK & CONCEPT STUDIES</span>
          <span>PROVEN IN PRODUCTION</span>
        </div>
        <div className="section-heading">
          <h2>
            Proof of
            <br />
            <em>possibility.</em>
          </h2>
          <p>
            Real client systems and studio directions.
            <br />
            Every project begins with a distinct point of view.
          </p>
        </div>

        {/* Minimal Studio Category Filter */}
        <div className="work-filter-bar" role="tablist" aria-label="Portfolio filter">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`filter-link ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Works <sup>{projects.length}</sup>
          </button>
          <span className="filter-sep">/</span>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'client'}
            className={`filter-link ${filter === 'client' ? 'active' : ''}`}
            onClick={() => setFilter('client')}
          >
            Client Releases <sup>3</sup>
          </button>
          <span className="filter-sep">/</span>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'concept'}
            className={`filter-link ${filter === 'concept' ? 'active' : ''}`}
            onClick={() => setFilter('concept')}
          >
            Concept Studies <sup>3</sup>
          </button>
        </div>

        {/* Work Grid */}
        <div className="work-grid">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`project project-${project.id} ${project.id === 'flow' ? 'project-wide' : ''
                }`}
              onClick={() => openProject(project)}
            >
              <div className="project-art">
                {project.coverImage ? (
                  <div className="project-cover-wrap">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="project-cover-img"
                      loading="lazy"
                    />
                    <div className="project-cover-scrim" />
                    <div className="project-cover-content">
                      <div className="cover-top-meta">
                        <span className="cover-client-label">{project.client}</span>
                        <span className="cover-badge-pill">{project.badge}</span>
                      </div>
                      <div className="cover-bottom-meta">
                        <strong>{project.subtitle}</strong>
                        <span className="project-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Forma Card Art */}
                    {project.id === 'forma' && (
                      <div className="art-forma">
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
                    )}

                    {/* Connect Card Art */}
                    {project.id === 'connect' && (
                      <div className="art-connect">
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
                    )}

                    {/* Flow Card Art */}
                    {project.id === 'flow' && (
                      <div className="art-flow">
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
                    )}
                  </>
                )}
              </div>

              {/* Minimal Caption */}
              <div className="project-caption">
                <h3>{project.title}</h3>
                <span>
                  {project.tags.split('/')[0].trim()} /{' '}
                  {project.kind === 'client' ? 'CLIENT RELEASE' : 'STUDIO CONCEPT'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Case Study Dialog Modal */}
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
          ) {
            closeProject();
          }
        }}
      >
        <button className="dialog-close" aria-label="Close project" onClick={closeProject}>
          ×
        </button>

        {selected.coverImage && (
          <div className="dialog-cover-hero">
            <img
              src={selected.coverImage}
              alt={selected.title}
              className="dialog-cover-image"
            />
            <div className="dialog-cover-tagline">
              <span>{selected.client}</span>
              <span className="dialog-badge-tag">{selected.badge}</span>
            </div>
          </div>
        )}

        <span className="eyebrow">
          {selected.kind === 'client' ? 'COMMISSIONED CLIENT PROJECT' : 'STUDIO CONCEPT STUDY'}
        </span>
        <h2 id="project-title">{selected.title}</h2>
        <p>{selected.description}</p>

        {selected.metrics && selected.metrics.length > 0 && (
          <div className="dialog-metrics-grid">
            {selected.metrics.map((m, i) => (
              <div key={i} className="dialog-metric-item">
                <span className="metric-val">{m.value}</span>
                <span className="metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {selected.challenge && selected.solution && (
          <div className="dialog-brief-block">
            <p>
              <strong>The Brief & Outcome:</strong> {selected.solution}
            </p>
          </div>
        )}

        {selected.deliverables && selected.deliverables.length > 0 && (
          <div className="dialog-deliverables-block">
            <small className="deliverables-title">KEY DELIVERABLES</small>
            <ul className="deliverables-list">
              {selected.deliverables.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-tags">{selected.tags}</div>

        <div className="dialog-actions-row">
          {selected.externalUrl && (
            <a
              className="pill"
              href={selected.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live project ↗
            </a>
          )}
          <a className="pill pill-subtle" href="#contact" onClick={closeProject}>
            Build something like this ↗
          </a>
        </div>
      </dialog>
    </>
  );
}
