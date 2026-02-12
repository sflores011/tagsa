import Hero from '@/components/home/Hero';
import ControlTotal from '@/components/home/ControlTotal';
import Elegirnos from '@/components/home/Elegirnos';
import { getHomePageData } from '@/lib/wordpress';
import { PageData, Block } from '@/types';

// Función auxiliar para extraer contenido de forma segura
const getBlockContent = (blocks: Block[], blockType: string): Block | undefined => {
  return blocks.find(b => b.type === blockType);
};

export default async function Home() {
  const pageData: PageData | null = await getHomePageData();

  if (!pageData) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-xl">Cargando...</p>
      </main>
    );
  }

  // --- 1. SECCIÓN HERO ---
  const heroGroup = pageData.gutenberg_structure.find(
    block => block.type === 'core/group' && block.attributes.metadata?.name === 'Hero'
  );

  let heroData = {
    backgroundImageUrl: '',
    title: '',
    description: '',
    buttonText: '',
    buttonUrl: '',
    stats: [] as { value: string; label: string }[]
  };

  if (heroGroup && heroGroup.blocks) {
    const imageBlock = getBlockContent(heroGroup.blocks, 'core/image');
    heroData.backgroundImageUrl = imageBlock?.url || '';

    const headingBlock = getBlockContent(heroGroup.blocks, 'core/heading');
    heroData.title = headingBlock?.content || '';

    const paragraphBlock = getBlockContent(heroGroup.blocks, 'core/paragraph');
    heroData.description = paragraphBlock?.content || '';

    const buttonsBlock = heroGroup.blocks.find(b => b.type === 'core/buttons');
    if (buttonsBlock && buttonsBlock.buttons && buttonsBlock.buttons.length > 0) {
      const btn = buttonsBlock.buttons[0];
      heroData.buttonText = btn.text || 'Ver más';
      heroData.buttonUrl = btn.url || '#';
    }

    const statsColumnsBlock = heroGroup.blocks.find(
      b => b.type === 'core/columns' && b.attributes.metadata?.name === 'numeros'
    );

    if (statsColumnsBlock && statsColumnsBlock.columns) {
      heroData.stats = statsColumnsBlock.columns.map(col => {
        const valBlock = col.blocks.find(b => b.type === 'core/heading');
        const labelBlock = col.blocks.find(b => b.type === 'core/paragraph');
        return {
          value: valBlock?.content || '',
          label: labelBlock?.content || ''
        };
      });
    }
  }

  // --- 2. SECCIÓN CONTROL TOTAL ---
  const controlGroup = pageData.gutenberg_structure.find(
    block => block.type === 'core/group' && block.attributes.metadata?.name === 'Control-total'
  );

  let controlData = {
    mainTitle: '',
    mainDescription: '',
    imageSrc: '',
    subTitle: '',
    subDescription: '',
    buttonText: '',
    buttonUrl: ''
  };

  if (controlGroup && controlGroup.blocks) {
    controlData.mainTitle = getBlockContent(controlGroup.blocks, 'core/heading')?.content || '';
    controlData.mainDescription = getBlockContent(controlGroup.blocks, 'core/paragraph')?.content || '';

    const columns = controlGroup.blocks.find(b => b.type === 'core/columns');
    if (columns && columns.columns && columns.columns.length >= 2) {
      // Columna izquierda (Imagen)
      const leftCol = columns.columns[0];
      const imgBlock = getBlockContent(leftCol.blocks, 'core/image');
      controlData.imageSrc = imgBlock?.url || '';

      // Columna derecha (Contenido)
      const rightCol = columns.columns[1];
      controlData.subTitle = getBlockContent(rightCol.blocks, 'core/heading')?.content || '';
      controlData.subDescription = getBlockContent(rightCol.blocks, 'core/paragraph')?.content || '';

      const btns = rightCol.blocks.find(b => b.type === 'core/buttons');
      if (btns && btns.buttons && btns.buttons.length > 0) {
        controlData.buttonText = btns.buttons[0].text || '';
        controlData.buttonUrl = btns.buttons[0].url || '#';
      }
    }
  }

  // --- 3. SECCIÓN POR QUÉ ELEGIRNOS ---
  const chooseGroup = pageData.gutenberg_structure.find(
    block => block.type === 'core/group' && block.attributes.metadata?.name === 'Elegirnos'
  );

  let chooseData = {
    title: '',
    backgroundImage: '',
    features: [] as { iconUrl: string; title: string; description: string; name: string }[]
  };

  if (chooseGroup && chooseGroup.blocks) {
    // Extraer imagen de fondo (primer bloque de tipo core/image en el grupo principal)
    const bgImageBlock = chooseGroup.blocks.find(b => b.type === 'core/image');
    if (bgImageBlock) {
      chooseData.backgroundImage = bgImageBlock.url || '';
    }

    // Extraer título principal
    chooseData.title = getBlockContent(chooseGroup.blocks, 'core/heading')?.content || '';

    // Encontrar todos los grupos anidados (satisfaccion, pago, gestion, servicio, soluciones, entrega)
    const featureGroups = chooseGroup.blocks.filter(b => b.type === 'core/group');

    chooseData.features = featureGroups.map(grp => {
      // Extraer el nombre de metadatos para el diseño de la cuadrícula
      const name = grp.attributes?.metadata?.name || '';

      if (!grp.blocks) return { iconUrl: '', title: '', description: '', name };

      const icon = getBlockContent(grp.blocks, 'core/image')?.url || '';
      const title = getBlockContent(grp.blocks, 'core/heading')?.content || '';
      const desc = getBlockContent(grp.blocks, 'core/paragraph')?.content || '';

      return { iconUrl: icon, title, description: desc, name };
    });
  }


  return (
    <>
      <Hero {...heroData} />
      <ControlTotal {...controlData} />
      <Elegirnos {...chooseData} />
    </>
  );
}
