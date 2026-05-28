import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * useDictionary — fetches and provides filtered access to the dictionary data
 */
export function useDictionary() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPos, setSelectedPos] = useState('Tất cả');
  const [selectedEra, setSelectedEra] = useState(null);
  const [showModernOnly, setShowModernOnly] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [dictRes, statsRes] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/data/dictionary.json`),
          fetch(`${process.env.PUBLIC_URL}/data/stats.json`),
        ]);

        if (!dictRes.ok || !statsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const dictData = await dictRes.json();
        const statsData = await statsRes.json();

        setData(dictData);
        setStats(statsData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtered results
  const filteredData = useMemo(() => {
    let results = data;

    // Category filter
    if (selectedCategory && selectedCategory !== 'Tất cả') {
      results = results.filter(item => item.danh_muc === selectedCategory);
    }

    // POS filter
    if (selectedPos && selectedPos !== 'Tất cả') {
      results = results.filter(item => item.pos.includes(selectedPos));
    }

    // Era filter
    if (selectedEra) {
      results = results.filter(item => item.giai_doan === selectedEra);
    }

    // Modern equivalent only
    if (showModernOnly) {
      results = results.filter(item => item.has_modern);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(item =>
        item.tu.toLowerCase().includes(q) ||
        item.tu_hien_nay.toLowerCase().includes(q) ||
        item.nghia.toLowerCase().includes(q)
      );
    }

    return results;
  }, [data, searchQuery, selectedCategory, selectedPos, selectedEra, showModernOnly]);

  // Categories list
  const categories = useMemo(() => {
    if (!stats) return [];
    return ['Tất cả', ...Object.keys(stats.categories || {}).sort((a, b) => {
      if (a === 'Tổng hợp') return 1;
      if (b === 'Tổng hợp') return -1;
      return (stats.categories[b] || 0) - (stats.categories[a] || 0);
    })];
  }, [stats]);

  // Letter index for quick jump
  const letterIndex = useMemo(() => {
    if (!stats) return {};
    return stats.letter_index || {};
  }, [stats]);

  // Random entries for hero / floating words
  const getRandomEntries = useCallback((count = 10) => {
    if (data.length === 0) return [];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [data]);

  // Get entries with modern equivalents (for past↔present comparison)
  const modernPairs = useMemo(() => {
    return data.filter(item => item.has_modern);
  }, [data]);

  return {
    data,
    filteredData,
    stats,
    loading,
    error,
    categories,
    letterIndex,
    modernPairs,
    getRandomEntries,
    // Setters
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPos,
    setSelectedPos,
    selectedEra,
    setSelectedEra,
    showModernOnly,
    setShowModernOnly,
  };
}
