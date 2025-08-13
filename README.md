# PokéApp

A modern Pokemon application built with Next.js, TanStack Query, and Tailwind CSS that integrates with the [PokéAPI](https://pokeapi.co/).

## Features

- 🎯 **Pokemon List**: Browse through all Pokemon with infinite scrolling
- 🔍 **Search Functionality**: Search for specific Pokemon by name
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎨 **Modern UI**: Beautiful interface using Tailwind CSS
- 🔄 **Real-time Data**: Live data from PokéAPI with TanStack Query caching
- 📊 **Pokemon Details**: View Pokemon stats, types, and abilities

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Query Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript
- **API**: [PokéAPI](https://pokeapi.co/)

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd poke-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with TanStack Query provider
│   ├── page.tsx        # Main page component
│   └── providers.tsx   # TanStack Query provider setup
├── components/         # React components
│   ├── PokemonCard.tsx # Individual Pokemon card component
│   ├── PokemonList.tsx # Pokemon list with infinite scroll
│   └── PokemonSearch.tsx # Search functionality
├── hooks/             # Custom React hooks
│   └── usePokemon.ts  # TanStack Query hooks for Pokemon data
└── services/          # API service layer
    └── pokeapi.ts     # PokéAPI integration
```

## API Integration

The app integrates with the [PokéAPI](https://pokeapi.co/) using the following endpoints:

- `GET /api/v2/pokemon` - Get Pokemon list with pagination
- `GET /api/v2/pokemon/{id}` - Get specific Pokemon details
- `GET /api/v2/type` - Get Pokemon types
- `GET /api/v2/ability` - Get Pokemon abilities

## TanStack Query Features

- **Automatic Caching**: Pokemon data is cached for optimal performance
- **Background Updates**: Data stays fresh with automatic background refetching
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Smooth loading experiences with skeleton states
- **Infinite Queries**: Efficient pagination for large datasets

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokemon data
- [TanStack](https://tanstack.com/) for the excellent React Query library
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
