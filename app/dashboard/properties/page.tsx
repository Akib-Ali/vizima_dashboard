"use client"

import { useState } from "react"
import Header from "@/src/components/Property/header/header"
import PropertyList from "@/src/components/Property/PropertyList/list"
import { getPropertiesfullInquiries } from "@/src/services/propertyService"
import { useEffect } from "react"
import { useDebounce } from "@/src/components/Property/hooks/useDebounce"
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query';
import { PropertyFormData } from "@/src/components/Property/Schema/property-schema"
import { addProperty } from "@/src/services/propertyService"
import { toast } from "sonner";
import Pagination from "@/src/components/Property/pagination/pagination"

export default function PropertiesPage() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isUserPriceChange, setIsUserPriceChange] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [status, setStatus] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [sharingType, setsharingType] = useState<string>('all')
  const [bedrooms, setBedrooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isAvailableTouched, setIsAvailableTouched] = useState(false);
  const [isFeaturedTouched, setIsFeaturedTouched] = useState(false);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [furnishingStatus, setfurnishingStatus] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([110, 10000]);
  const [getAllPremiumProperty, setGetAllPremiumProperty] = useState([])
  const [parsedUser, setParsedUser] = useState<{ id: string } | null>(null);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedCity = useDebounce(city, 500);
  const debouncedState = useDebounce(state, 500);

  const debouncedPriceRange = useDebounce(priceRange, 500);
  const ITEMS_PER_PAGE = 10


  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, debouncedPriceRange, status, type, furnishingStatus, debouncedCity, debouncedState]);


  const fetchProperties = useCallback(() => {
    const payload: any = {
      page: currentPage,
      search: debouncedSearch,
      city: debouncedCity,
      state: debouncedState,
      bathrooms,
      bedrooms,
      location: debouncedSearch,
      status,
      furnishingStatus,
      sortField,
      limit: ITEMS_PER_PAGE,
      sortBy,
      sortOrder,
      amenities: selectedAmenities.join(",")

    };

    if (isUserPriceChange) {
      payload.minPrice = debouncedPriceRange[0];
      payload.maxPrice = debouncedPriceRange[1];
    }

    if (sharingType !== "all") {
      payload.sharingType = sharingType;
    }

    if (bedrooms > 0) {
      payload.bedrooms = bedrooms;

    }
    if (bathrooms > 0) {
      payload.bathrooms = bathrooms;

    }
    if (isAvailableTouched) {
      payload.isAvailable = isAvailable;
    }

    if (isFeaturedTouched) {
      payload.isFeatured = isFeatured;
    }

    if (type && type !== "all") {

      payload.type = type;
    }
    return getPropertiesfullInquiries(payload);
  }, [
    currentPage,
    debouncedSearch,
    debouncedCity,
    debouncedState,
    status,
    type,
    furnishingStatus,
    isUserPriceChange,
    debouncedPriceRange,
    sortField,
    sortOrder,
    sharingType,
    bedrooms,
    bathrooms,
    isAvailable,
    isFeatured,
    sortBy,
    sortOrder,
    selectedAmenities
  ]);


  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['properties', currentPage, debouncedSearch, status, type, furnishingStatus, debouncedPriceRange, sortField, sortOrder, sharingType, bathrooms, bedrooms, isAvailableTouched ? isAvailable : null,
      isFeaturedTouched ? isFeatured : null, sortBy, sortOrder, debouncedCity, debouncedState, selectedAmenities],
    queryFn: fetchProperties,
  });

  const properties = data?.data?.properties || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.pages || 1;
  const totalRecord = pagination?.total


  const handleAddProperty = async (
    data: PropertyFormData,
    onSuccess: () => void
  ) => {
    try {
      const res = await addProperty(data);
      toast.success("Property added successfully!");
      onSuccess();
      setOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add property");
    }
  };


  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-muted-foreground">Manage your PG and Hostel listings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddPropertyDialog />
        </div>
      </div> */}

      <Header open={open} setOpen={setOpen} onSubmit={handleAddProperty} />


      <PropertyList properties={properties} search={search} setSearch={setSearch} type={type} setType={setType} sharingType={sharingType} setsharingType={setsharingType} isLoading={isLoading} bathrooms={bathrooms} setBathrooms={setBathrooms} bedrooms={bedrooms} setBedrooms={setBedrooms} isAvailable={isAvailable}
        setIsAvailable={setIsAvailable}
        isFeatured={isFeatured}
        setIsFeatured={setIsFeatured} isAvailableTouched={isAvailableTouched} setIsAvailableTouched={setIsAvailableTouched} isFeaturedTouched={isFeaturedTouched} setIsFeaturedTouched={setIsFeaturedTouched} sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} city={city} setCity={setCity} state={state} setState={setState} selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities} />


      {isLoading == false && totalRecord != 0 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      }

    </div>



  )
}
