import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const renderAsciiEarth = (rotation) => {
  const width = 15;
  const height = 9;
  const centreX = (width - 1) / 2;
  const centreY = (height - 1) / 2;
  const rows = [];

  for (let y = 0; y < height; y += 1) {
    const normalisedY =
      (y - centreY) / centreY;

    let row = '';

    for (let x = 0; x < width; x += 1) {
      const normalisedX =
        (x - centreX) / centreX;

      const radiusSquared =
        (normalisedX * normalisedX) +
        (normalisedY * normalisedY);

      if (radiusSquared > 1) {
        row += ' ';
        continue;
      }

      const depth = Math.sqrt(
        Math.max(0, 1 - radiusSquared)
      );

      const longitude =
        Math.atan2(normalisedX, depth) +
        rotation;

      const latitude = Math.asin(
        Math.max(
          -1,
          Math.min(1, normalisedY)
        )
      );

      const landSignal =
        Math.sin(
          (longitude * 2.1) +
          (Math.cos(latitude * 3) * 0.8)
        ) +
        (
          0.58 *
          Math.cos(
            (longitude * 4.7) -
            (latitude * 2.2)
          )
        ) +
        (
          0.32 *
          Math.sin(
            (longitude * 7.1) +
            (latitude * 5.1)
          )
        );

      const distanceFromEdge =
        1 - radiusSquared;

      if (distanceFromEdge < 0.16) {
        row += '.';
      } else if (landSignal > 0.78) {
        row += '#';
      } else if (landSignal > 0.34) {
        row += '+';
      } else if (
        landSignal > 0.08 &&
        depth < 0.72
      ) {
        row += ':';
      } else {
        row += ' ';
      }
    }

    rows.push(row.replace(/\s+$/, ''));
  }

  return rows.join('\n');
};

const EARTH_ROTATION_DIRECTION = -1;

const IDLE_EARTH_ROTATION_PER_MS =
  EARTH_ROTATION_DIRECTION *
  (0.18 / 140);

const FULL_EARTH_ROTATION =
  Math.PI * 2;

const EARTH_DECELERATION_MS = 180;

const AsciiEarthLogo = ({
  isTransitioning = false,
  transitionDurationMs = 920,
}) => {
  const [rotation, setRotation] = useState(0);
  const [motionAllowed, setMotionAllowed] =
    useState(false);

  const rotationRef = useRef(0);
  const rotationSpeedRef = useRef(
    IDLE_EARTH_ROTATION_PER_MS
  );

  const transitionStateRef = useRef(
    isTransitioning
  );

  const transitionDurationRef = useRef(
    transitionDurationMs
  );

  useEffect(() => {
    transitionStateRef.current =
      isTransitioning;

    transitionDurationRef.current =
      transitionDurationMs;
  }, [
    isTransitioning,
    transitionDurationMs,
  ]);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateMotionPreference = () => {
      setMotionAllowed(!motionQuery.matches);
    };

    updateMotionPreference();

    if (
      typeof motionQuery.addEventListener ===
      'function'
    ) {
      motionQuery.addEventListener(
        'change',
        updateMotionPreference
      );

      return () => {
        motionQuery.removeEventListener(
          'change',
          updateMotionPreference
        );
      };
    }

    motionQuery.addListener(
      updateMotionPreference
    );

    return () => {
      motionQuery.removeListener(
        updateMotionPreference
      );
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed) {
      rotationRef.current = 0;

      rotationSpeedRef.current =
        IDLE_EARTH_ROTATION_PER_MS;

      setRotation(0);
      return undefined;
    }

    let animationFrameId = null;
    let previousTimestamp =
      window.performance.now();

    const animateEarth = (timestamp) => {
      const elapsedMs = Math.min(
        timestamp - previousTimestamp,
        64
      );

      previousTimestamp = timestamp;

      const safeTransitionDuration = Math.max(
        1,
        transitionDurationRef.current
      );

      const transitionRotationPerMs =
        EARTH_ROTATION_DIRECTION *
        (
          FULL_EARTH_ROTATION /
          safeTransitionDuration
        );

      if (transitionStateRef.current) {
        rotationSpeedRef.current =
          transitionRotationPerMs;
      } else {
        const decelerationProgress =
          1 -
          Math.exp(
            -elapsedMs /
            EARTH_DECELERATION_MS
          );

        rotationSpeedRef.current +=
          (
            IDLE_EARTH_ROTATION_PER_MS -
            rotationSpeedRef.current
          ) *
          decelerationProgress;
      }

      rotationRef.current =
        (
          rotationRef.current +
          (
            rotationSpeedRef.current *
            elapsedMs
          )
        ) %
        FULL_EARTH_ROTATION;

      setRotation(rotationRef.current);

      animationFrameId =
        window.requestAnimationFrame(
          animateEarth
        );
    };

    animationFrameId =
      window.requestAnimationFrame(
        animateEarth
      );

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(
          animationFrameId
        );
      }
    };
  }, [motionAllowed]);

  return (
    <pre
      className="sidebar-ascii-earth"
      aria-hidden="true"
    >
      {renderAsciiEarth(rotation)}
    </pre>
  );
};

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'about', label: 'About', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' },
];

const MOBILE_GLOBE_HOLD_MS = 340;
const MOBILE_GLOBE_DEAD_ZONE = 30;
const MOBILE_GLOBE_PUCK_LIMIT = 22;
const MOBILE_GLOBE_ITEM_RADIUS_REM = 5.7;

const MOBILE_NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    number: '01',
    angle: -110,
    action: 'section',
  },
  {
    id: 'work',
    label: 'Work',
    number: '02',
    angle: -140,
    action: 'section',
  },
  {
    id: 'experience',
    label: 'Experience',
    number: '03',
    angle: -170,
    action: 'section',
  },
  {
    id: 'about',
    label: 'About',
    number: '04',
    angle: 170,
    action: 'section',
  },
  {
    id: 'contact',
    label: 'Contact',
    number: '05',
    angle: 140,
    action: 'section',
  },
  {
    id: 'resume',
    label: 'Resume',
    number: '06',
    angle: 110,
    action: 'download',
  },
];

const MobileGlobeNavigation = ({
  activeSection,
  transitionPhase = 'idle',
  transitionDurationMs = 920,
  onSelectSection,
  onPreviewSection,
  onClearPreview,
}) => {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const holdTimerRef = useRef(null);
  const pointerIdRef = useRef(null);
  const isLongPressRef = useRef(false);
  const movedBeforeHoldRef = useRef(false);
  const isOpenRef = useRef(false);
  const selectedItemRef = useRef(null);

  const startPointRef = useRef({
    x: 0,
    y: 0,
  });

  const centrePointRef = useRef({
    x: 0,
    y: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] =
    useState(false);

  const [selectedItemId, setSelectedItemId] =
    useState(null);

  const activeNavigationItem =
    NAVIGATION_ITEMS.find(
      (item) => item.id === activeSection
    ) || NAVIGATION_ITEMS[0];

  const clearHoldTimer = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(
        holdTimerRef.current
      );

      holdTimerRef.current = null;
    }
  };

  const releasePointerCapture = () => {
    const trigger = triggerRef.current;
    const pointerId = pointerIdRef.current;

    if (
      trigger &&
      pointerId !== null &&
      trigger.hasPointerCapture?.(pointerId)
    ) {
      trigger.releasePointerCapture(pointerId);
    }
  };

  const resetControllerPose = () => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    root.style.setProperty(
      '--mobile-globe-drag-x',
      '0px'
    );

    root.style.setProperty(
      '--mobile-globe-drag-y',
      '0px'
    );

    root.style.setProperty(
      '--mobile-selection-length',
      '0px'
    );
  };

  const updateSelectedItem = (itemId) => {
    if (selectedItemRef.current === itemId) {
      return;
    }

    selectedItemRef.current = itemId;
    setSelectedItemId(itemId);

    if (
      itemId &&
      typeof onPreviewSection === 'function'
    ) {
      onPreviewSection(itemId);
    }
  };

  const closeMenu = () => {
    clearHoldTimer();
    releasePointerCapture();

    pointerIdRef.current = null;
    isLongPressRef.current = false;
    movedBeforeHoldRef.current = false;
    isOpenRef.current = false;
    selectedItemRef.current = null;

    setIsOpen(false);
    setIsDragging(false);
    setSelectedItemId(null);

    resetControllerPose();

    if (
      typeof onClearPreview === 'function'
    ) {
      onClearPreview();
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');

    link.href =
      `${process.env.PUBLIC_URL}/cv.jpg`;

    link.download = '';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const activateItem = (itemId) => {
    const item =
      MOBILE_NAVIGATION_ITEMS.find(
        (candidate) =>
          candidate.id === itemId
      );

    closeMenu();

    if (!item) {
      return;
    }

    if (item.action === 'download') {
      downloadResume();
      return;
    }

    if (
      typeof onSelectSection === 'function'
    ) {
      onSelectSection(item.id);
    }
  };

  const openTapMenu = () => {
    isOpenRef.current = true;
    selectedItemRef.current = null;

    setIsOpen(true);
    setIsDragging(false);
    setSelectedItemId(null);
    resetControllerPose();
  };

  const calculateSelection = (
    pointerX,
    pointerY
  ) => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const deltaX =
      pointerX - centrePointRef.current.x;

    const deltaY =
      pointerY - centrePointRef.current.y;

    const distance = Math.hypot(
      deltaX,
      deltaY
    );

    const unitX =
      distance > 0 ? deltaX / distance : 0;

    const unitY =
      distance > 0 ? deltaY / distance : 0;

    const puckDistance = Math.min(
      distance,
      MOBILE_GLOBE_PUCK_LIMIT
    );

    const puckX = unitX * puckDistance;
    const puckY = unitY * puckDistance;

    root.style.setProperty(
      '--mobile-globe-drag-x',
      `${puckX.toFixed(2)}px`
    );

    root.style.setProperty(
      '--mobile-globe-drag-y',
      `${puckY.toFixed(2)}px`
    );

    const pointerAngle = Math.atan2(
      deltaY,
      deltaX
    );

    root.style.setProperty(
      '--mobile-selection-angle',
      `${pointerAngle}rad`
    );

    root.style.setProperty(
      '--mobile-selection-length',
      distance >= MOBILE_GLOBE_DEAD_ZONE
        ? `${Math.min(distance, 94).toFixed(2)}px`
        : '0px'
    );

    if (
      distance < MOBILE_GLOBE_DEAD_ZONE
    ) {
      updateSelectedItem(null);
      return;
    }

    let nearestItem = null;
    let nearestScore = -Infinity;

    MOBILE_NAVIGATION_ITEMS.forEach(
      (item) => {
        const angleRadians =
          item.angle * (Math.PI / 180);

        const itemUnitX =
          Math.cos(angleRadians);

        const itemUnitY =
          Math.sin(angleRadians);

        const score =
          (unitX * itemUnitX) +
          (unitY * itemUnitY);

        if (score > nearestScore) {
          nearestScore = score;
          nearestItem = item;
        }
      }
    );

    updateSelectedItem(
      nearestItem?.id || null
    );
  };

  const handlePointerDown = (event) => {
    if (
      transitionPhase !== 'idle' ||
      (
        event.pointerType === 'mouse' &&
        event.button !== 0
      )
    ) {
      return;
    }

    event.preventDefault();

    if (isOpenRef.current) {
      closeMenu();
      return;
    }

    clearHoldTimer();

    pointerIdRef.current =
      event.pointerId;

    isLongPressRef.current = false;
    movedBeforeHoldRef.current = false;

    startPointRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const triggerRect =
      triggerRef.current
        ?.getBoundingClientRect();

    centrePointRef.current = {
      x: triggerRect
        ? triggerRect.left +
          (triggerRect.width / 2)
        : event.clientX,

      y: triggerRect
        ? triggerRect.top +
          (triggerRect.height / 2)
        : event.clientY,
    };

    try {
      triggerRef.current?.setPointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture is optional.
    }

    holdTimerRef.current =
      window.setTimeout(() => {
        holdTimerRef.current = null;

        if (movedBeforeHoldRef.current) {
          return;
        }

        isLongPressRef.current = true;
        isOpenRef.current = true;

        setIsOpen(true);
        setIsDragging(true);

        calculateSelection(
          event.clientX,
          event.clientY
        );

        if (
          typeof navigator.vibrate ===
          'function'
        ) {
          navigator.vibrate(12);
        }
      }, MOBILE_GLOBE_HOLD_MS);
  };

  const handlePointerMove = (event) => {
    if (
      pointerIdRef.current !==
      event.pointerId
    ) {
      return;
    }

    const initialDistance = Math.hypot(
      event.clientX -
        startPointRef.current.x,

      event.clientY -
        startPointRef.current.y
    );

    if (!isLongPressRef.current) {
      if (initialDistance > 12) {
        movedBeforeHoldRef.current = true;
        clearHoldTimer();
      }

      return;
    }

    event.preventDefault();

    calculateSelection(
      event.clientX,
      event.clientY
    );
  };

  const handlePointerUp = (event) => {
    if (
      pointerIdRef.current !==
      event.pointerId
    ) {
      return;
    }

    event.preventDefault();
    clearHoldTimer();
    releasePointerCapture();

    pointerIdRef.current = null;

    if (isLongPressRef.current) {
      const selectedItem =
        selectedItemRef.current;

      isLongPressRef.current = false;
      setIsDragging(false);
      resetControllerPose();

      if (selectedItem) {
        activateItem(selectedItem);
      } else {
        closeMenu();
      }

      return;
    }

    if (!movedBeforeHoldRef.current) {
      openTapMenu();
    }

    movedBeforeHoldRef.current = false;
  };

  const handlePointerCancel = () => {
    closeMenu();
  };

  useEffect(() => {
    isOpenRef.current = isOpen;

    document.documentElement.classList.toggle(
      'is-mobile-globe-menu-open',
      isOpen
    );

    return () => {
      document.documentElement.classList.remove(
        'is-mobile-globe-menu-open'
      );
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (transitionPhase === 'idle') {
      return;
    }

    clearHoldTimer();
    releasePointerCapture();

    pointerIdRef.current = null;
    isLongPressRef.current = false;
    movedBeforeHoldRef.current = false;
    isOpenRef.current = false;
    selectedItemRef.current = null;

    setIsOpen(false);
    setIsDragging(false);
    setSelectedItemId(null);

    resetControllerPose();
  }, [transitionPhase]);

  useEffect(() => {
    return () => {
      clearHoldTimer();
      releasePointerCapture();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        'mobile-globe-navigation',
        isOpen ? 'is-open' : '',
        isDragging ? 'is-dragging' : '',
        transitionPhase !== 'idle'
          ? 'is-transitioning'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className="mobile-globe-backdrop"
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close navigation menu"
        aria-hidden={!isOpen}
        onClick={closeMenu}
      />

      <div
        className="mobile-globe-wheel"
        id="mobile-globe-navigation-menu"
        role="menu"
        aria-hidden={!isOpen}
        aria-label="Portfolio navigation"
      >
        <span
          className="mobile-globe-wheel-ring"
          aria-hidden="true"
        />

        <span
          className="mobile-globe-selection-vector"
          aria-hidden="true"
        />

        {MOBILE_NAVIGATION_ITEMS.map(
          (item, index) => {
            const angleRadians =
              item.angle *
              (Math.PI / 180);

            const itemX =
              Math.cos(angleRadians) *
              MOBILE_GLOBE_ITEM_RADIUS_REM;

            const itemY =
              Math.sin(angleRadians) *
              MOBILE_GLOBE_ITEM_RADIUS_REM;

            const isSelected =
              selectedItemId === item.id;

            const isCurrent =
              activeSection === item.id;

            return (
              <button
                className={[
                  'mobile-globe-menu-item',
                  isSelected
                    ? 'is-selected'
                    : '',
                  isCurrent
                    ? 'is-current'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={item.id}
                type="button"
                role="menuitem"
                disabled={
                  !isOpen ||
                  transitionPhase !== 'idle'
                }
                aria-current={
                  isCurrent
                    ? 'page'
                    : undefined
                }
                style={{
                  '--mobile-menu-x':
                    `${itemX.toFixed(3)}rem`,

                  '--mobile-menu-y':
                    `${itemY.toFixed(3)}rem`,

                  '--mobile-menu-index':
                    index,
                }}
                onFocus={() => {
                  updateSelectedItem(item.id);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  activateItem(item.id);
                }}
              >
                <span className="mobile-globe-menu-number">
                  {item.number}
                </span>

                <span className="mobile-globe-menu-label">
                  {item.label}
                </span>
              </button>
            );
          }
        )}

        <button
          ref={triggerRef}
          className="mobile-globe-trigger"
          type="button"
          aria-label={
            isOpen
              ? 'Close portfolio navigation'
              : 'Hold and drag to navigate'
          }
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="mobile-globe-navigation-menu"
          onContextMenu={(event) => {
            event.preventDefault();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <span
            className="mobile-globe-trigger-orbit"
            aria-hidden="true"
          />

          <AsciiEarthLogo
            isTransitioning={
              transitionPhase !== 'idle'
            }
            transitionDurationMs={
              transitionDurationMs
            }
          />

          <span className="mobile-globe-route-code">
            {activeNavigationItem.number}
          </span>

          <span className="mobile-globe-trigger-label">
            {isOpen
              ? 'Drag / release'
              : 'Hold / navigate'}
          </span>
        </button>
      </div>
    </div>
  );
};

const Navbar = ({
  activeSection,
  transitionPhase = 'idle',
  transitionDurationMs = 920,
  onSelectSection,
  onPreviewSection,
  onClearPreview,
}) => {
  const selectSection = (section) => {
    if (typeof onSelectSection === 'function') {
      onSelectSection(section);
    }
  };

  const previewSection = (section) => {
    if (typeof onPreviewSection === 'function') {
      onPreviewSection(section);
    }
  };

  const clearPreview = () => {
    if (typeof onClearPreview === 'function') {
      onClearPreview();
    }
  };

  const handleSidebarBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearPreview();
    }
  };

  const activeNavigationItem =
    NAVIGATION_ITEMS.find(
      (item) => item.id === activeSection
    ) || NAVIGATION_ITEMS[0];

  const isTransitioning =
    transitionPhase !== 'idle';

  let transitionStatus = 'System online';

  if (transitionPhase === 'covering') {
    transitionStatus = 'Routing / cover';
  }

  if (transitionPhase === 'revealing') {
    transitionStatus = 'Routing / reveal';
  }

  return (
    <>
      <aside
        className={`site-sidebar${isTransitioning ? ' is-transitioning' : ''}`}
      aria-busy={isTransitioning}
      onMouseLeave={clearPreview}
      onBlur={handleSidebarBlur}
    >
      <div className="sidebar-identity">
        <button
          className="sidebar-identity-button sidebar-logo"
          type="button"
          aria-label="Open home panel"
          onMouseEnter={() => previewSection('home')}
          onFocus={() => previewSection('home')}
          onClick={() => selectSection('home')}
        >
          <span className="sidebar-logo-viewport">
            <AsciiEarthLogo
              isTransitioning={isTransitioning}
              transitionDurationMs={
                transitionDurationMs
              }
            />
          </span>

          <span
            className="sidebar-logo-label"
            aria-hidden="true"
          >
            World / live
          </span>
        </button>

        <button
          className="sidebar-identity-button sidebar-name-button"
          type="button"
          aria-label="Open home panel"
          onMouseEnter={() => previewSection('home')}
          onFocus={() => previewSection('home')}
          onClick={() => selectSection('home')}
        >
          <span className="sidebar-name-kicker">
            Portfolio system
          </span>

          <span className="sidebar-name">
            Oliver Wilde
          </span>

          <span className="sidebar-system-state">
            <span
              className="sidebar-system-state-dot"
              aria-hidden="true"
            />

            {transitionStatus}
          </span>
        </button>
      </div>

      <div
        className="sidebar-route-status"
        aria-live="polite"
      >
        <span>Current route</span>

        <strong>
          {activeNavigationItem.number}
          {' / '}
          {activeNavigationItem.label}
        </strong>
      </div>

      <nav className="sidebar-navigation" aria-label="Primary navigation">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              className={`sidebar-navigation-item${isActive ? ' is-active' : ''}`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={() => previewSection(item.id)}
              onFocus={() => previewSection(item.id)}
              onClick={() => selectSection(item.id)}
            >
              <span className="sidebar-navigation-number">
                {item.number}
              </span>

              <span className="sidebar-navigation-label">
                {item.label}
              </span>

              <span className="sidebar-navigation-arrow" aria-hidden="true">
                &rarr;
              </span>
            </button>
          );
        })}

        <a
          className="sidebar-navigation-item sidebar-resume-link"
          href={`${process.env.PUBLIC_URL}/cv.jpg`}
          download
          aria-label="Download current resume draft"
          onMouseEnter={() => previewSection('resume')}
          onFocus={() => previewSection('resume')}
        >
          <span className="sidebar-navigation-number">
            06
          </span>

          <span className="sidebar-navigation-label">
            Resume
          </span>

          <span className="sidebar-navigation-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </nav>

      <div
        className="sidebar-footer"
        aria-hidden="true"
      >
        <span>OW / Portfolio</span>
        <span>UK / 2026</span>
      </div>
      </aside>

      <MobileGlobeNavigation
        activeSection={activeSection}
        transitionPhase={transitionPhase}
        transitionDurationMs={
          transitionDurationMs
        }
        onSelectSection={selectSection}
        onPreviewSection={previewSection}
        onClearPreview={clearPreview}
      />
    </>
  );
};

export default Navbar;