export interface WpImage {
    id: number;
    url: string;
    width: number;
    height: number;
    alt: string;
}

export interface MenuItem {
    ID: number;
    title: string;
    url: string;
    children?: MenuItem[];
}

export interface HeaderData {
    logo?: WpImage;
    main_menu: MenuItem[];
}

export interface BlockAttributes {
    id?: number;
    sizeSlug?: string;
    linkDestination?: string;
    level?: number;
    content?: string;
    text?: string;
    url?: string;
    linkTarget?: string;
    rel?: string;
    metadata?: {
        name?: string;
    };
    className?: string;
}

export interface BlockButton {
    type: string;
    attributes: BlockAttributes;
    text: string;
    url: string;
    linkTarget: string;
    rel: string;
}

export interface Column {
    width?: string | null;
    blocks: Block[];
}

export interface Block {
    type: string;
    attributes: BlockAttributes;
    content?: string;
    url?: string;
    alt?: string;
    caption?: string;
    level?: number;
    buttons?: BlockButton[];
    blocks?: Block[]; // For core/group
    columns?: Column[]; // For core/columns
}

export interface Section {
    type: string;
    blocks: Block[];
}

export interface PageData {
    id: number;
    title: string;
    slug: string;
    status: string;
    link: string;
    gutenberg_structure: Block[];
    sections: Section[];
}
