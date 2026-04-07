// Mock data for demonstration
import type { Incident } from '@/types';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Avengers: Endgame - CAM Rip',
    thumbnail: '/thumbnails/avengers.jpg',
    platform: 'Netflix',
    type: 'Movie',
    risk: 'Critical',
    similarity: 98,
    status: 'New',
    url: 'https://example1.com/pirated-content',
    date: '2025-04-01T10:30:00Z',
    userId: 'user-1',
    description: 'High-quality CAM recording found on multiple platforms',
  },
  {
    id: '2',
    title: 'Taylor Swift - Latest Album',
    thumbnail: '/thumbnails/taylor.jpg',
    platform: 'YouTube',
    type: 'Music',
    risk: 'High',
    similarity: 95,
    status: 'In Progress',
    url: 'https://example2.com/music-piracy',
    date: '2025-04-02T14:20:00Z',
    userId: 'user-1',
  },
  {
    id: '3',
    title: 'Adobe Photoshop 2025 Crack',
    thumbnail: '/thumbnails/photoshop.jpg',
    platform: 'Twitter',
    type: 'Software',
    risk: 'Medium',
    similarity: 87,
    status: 'New',
    url: 'https://example3.com/software-crack',
    date: '2025-04-03T09:15:00Z',
    userId: 'user-1',
  },
  {
    id: '4',
    title: 'Spider-Man: No Way Home',
    thumbnail: '/thumbnails/spiderman.jpg',
    platform: 'Facebook',
    type: 'Movie',
    risk: 'High',
    similarity: 92,
    status: 'Resolved',
    url: 'https://example4.com/movie-piracy',
    date: '2025-04-04T16:45:00Z',
    userId: 'user-1',
  },
  {
    id: '5',
    title: 'Video Game - Elden Ring',
    thumbnail: '/thumbnails/eldenring.jpg',
    platform: 'Instagram',
    type: 'Game',
    risk: 'Low',
    similarity: 78,
    status: 'New',
    url: 'https://example5.com/game-piracy',
    date: '2025-04-05T11:00:00Z',
    userId: 'user-1',
  },
];

export const columns = [
  {
    key: 'title',
    header: 'Title',
    sortable: true,
    accessor: (item: Incident) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-500 text-xs">
          {item.type.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-slate-900">{item.title}</p>
          <p className="text-sm text-slate-500">{item.platform}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
  },
  {
    key: 'risk',
    header: 'Risk',
    sortable: true,
    accessor: (item: Incident) => {
      const colors = {
        Critical: 'bg-red-100 text-red-800',
        High: 'bg-orange-100 text-orange-800',
        Medium: 'bg-amber-100 text-amber-800',
        Low: 'bg-green-100 text-green-800',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[item.risk]}`}>
          {item.risk}
        </span>
      );
    },
  },
  {
    key: 'similarity',
    header: 'Similarity',
    sortable: true,
    accessor: (item: Incident) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-200 rounded-full h-2">
          <div
            className="bg-teal-600 rounded-full h-2"
            style={{ width: `${item.similarity}%` }}
          />
        </div>
        <span className="text-sm text-slate-600">{item.similarity}%</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    accessor: (item: Incident) => {
      const colors = {
        New: 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        Resolved: 'bg-green-100 text-green-800',
        Closed: 'bg-gray-100 text-gray-800',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[item.status]}`}>
          {item.status}
        </span>
      );
    },
  },
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    accessor: (item: Incident) => new Date(item.date).toLocaleDateString(),
  },
];