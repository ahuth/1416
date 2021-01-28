import { useEffect, useRef, useState, Ref } from 'react';
import useApartment, { Current, Actions } from '../hooks/useApartment';

type SectionFunc = (id: number, active: boolean) => React.ReactNode;

export default function App() {
  const [current, actions] = useApartment();
  const [items, setItems] = useState<SectionFunc[]>([]);
  const latestSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add the new section to the list that will be displayed on the page. Every time the user takes
    // an action, we add a new section to the page.
    const next = getContentFactory(current, actions, latestSectionRef);
    setItems((prevItems) => prevItems.concat(next));

    // Scroll the window to the new section. That way, if the section is off the page it will scroll
    // into view.
    const timeoutId = setTimeout(() => {
      if (latestSectionRef.current) {
        latestSectionRef.current.scrollIntoView();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [current, actions]);

  return (
    <main>
      <h1>Apartment 1416</h1>
      {items.map((sectionFunc, index) => {
        const active = index === items.length - 1;
        return sectionFunc(index, active);
      })}
    </main>
  );
}

function getContentFactory(current: Current, actions: Actions, latestSectionRef: Ref<HTMLElement>): SectionFunc {
  return function (id, active) {
    switch (current) {
      case 'entry':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Entry</p>
            <button disabled={!active} onClick={actions.goNorth}>Go north</button>
            <br />
            <button disabled={!active} onClick={actions.goWest}>Go west</button>
            <button disabled={!active} onClick={actions.goEast}>Go east</button>
          </section>
        );
      case 'kitchen':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Kitchen</p>
            <button disabled={!active} onClick={actions.goWest}>Go west</button>
          </section>
        );
      case 'dining':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Dining</p>
            <button disabled={!active} onClick={actions.goEast}>Go east</button>
            <br />
            <button disabled={!active} onClick={actions.goSouth}>Go south</button>
          </section>
        );
      case 'living':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Living</p>
            <button disabled={!active} onClick={actions.goWest}>Go west</button>
          </section>
        );
      case 'hallway1':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Hallway</p>
            <button disabled={!active} onClick={actions.goWest}>Go west</button>
            <button disabled={!active} onClick={actions.goEast}>Go east</button>
          </section>
        );
      case 'bedrooms_entry':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Bedrooms entry</p>
            <button disabled={!active} onClick={actions.goNorth}>Go north</button>
            <br />
            <button disabled={!active} onClick={actions.goWest}>Go west</button>
            <button disabled={!active} onClick={actions.goEast}>Go east</button>
            <br />
            <button disabled={!active} onClick={actions.goSouth}>Go south</button>
          </section>
        );
      case 'guest_bathroom':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Guest bathroom</p>
            <button disabled={!active} onClick={actions.goNorth}>Go north</button>
          </section>
        );
      case 'guest_bedroom':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Guest bedroom</p>
            <button disabled={!active} onClick={actions.goSouth}>Go south</button>
          </section>
        );
      case 'master_bedroom':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Master bedroom</p>
            <button disabled={!active} onClick={actions.goEast}>Go east</button>
            <br />
            <button disabled={!active} onClick={actions.goSouth}>Go south</button>
          </section>
        );
      case 'master_bathroom':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Master bathroom</p>
            <button disabled={!active} onClick={actions.goNorth}>Go north</button>
          </section>
        );
      case 'master_closets':
        return (
          <section key={id} ref={active ? latestSectionRef : undefined}>
            <p>Master closets</p>
            <button disabled={!active} onClick={actions.goNorth}>Go north</button>
            <br />
            <button disabled={!active} onClick={actions.goSouth}>Go south</button>
          </section>
        );
      default:
        assertUnreachable(current);
    }
  };
}

function assertUnreachable(arg: never): never {
  throw new Error(`Unknown value: ${arg}`);
}
