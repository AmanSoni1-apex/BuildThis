export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Profile {
    id: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
}

export interface Problem {
    id: string;
    title: string;
    description: string;
    category_id: number;
    user_id: string;
    tags?: string[];
    upvotes_count: number;
    bookmarks_count: number;
    ai_refined: boolean;
    status: 'active' | 'archived' | 'deleted';
    created_at: string;
    updated_at: string;

    // Joined fields
    category?: Category;
    author?: Profile;
}

export interface Vote {
    id: string;
    user_id: string;
    problem_id: string;
    created_at: string;
}

export interface Bookmark {
    id: string;
    user_id: string;
    problem_id: string;
    created_at: string;
}
