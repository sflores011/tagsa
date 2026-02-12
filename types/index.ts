export interface WpImage {
    id: number | string;
    url: string;
    width: number;
    height: number;
    alt: string;
    sizes?: {
        [key: string]: {
            url: string;
            width: number;
            height: number;
        }
    };
}

export interface MenuItem {
    id: number | string;
    title: string;
    url: string;
    slug?: string;
    target?: string;
    description?: string;
    type?: string;
    object?: string;
    object_id?: number | null;
    has_children?: boolean;
    featured_image?: any;
    children?: MenuItem[];
}

export interface HeaderData {
    site_info: {
        name: string;
        description: string;
        url: string;
        admin_email: string;
    };
    logo: WpImage & { has_logo: boolean };
    menu: {
        items: MenuItem[];
    };
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

export interface SocialNetwork {
    platform: string;
    url: string;
    icon?: string;
}

export interface FooterBlock {
    type: string;
    attributes?: any;
    content?: string;
    children?: FooterBlock[];
    image?: {
        id: number;
        url: string;
        alt: string;
        width: number;
        height: number;
    };
}

export interface FooterData {
    site_info: {
        name: string;
        description: string;
        url: string;
        year: string;
    };
    logo: WpImage & { has_logo: boolean };
    copyright: {
        text: string;
        year: string;
        site_name: string;
    };
    social_networks: {
        networks: SocialNetwork[];
        count: number;
    };
    menu: {
        exists: boolean;
        items: MenuItem[];
        item_count: number;
        message?: string;
    };
    widgets: {
        areas: any[];
        count: number;
    };
    content: {
        is_block_theme: boolean;
        blocks: FooterBlock[];
    };
}
