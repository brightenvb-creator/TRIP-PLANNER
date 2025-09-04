import jsPDF from 'jspdf';
import { Trip } from '../types';
import { formatDate, getTripDuration } from './dateUtils';

export const exportTripToPDF = (trip: Trip): void => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let currentY = margin;

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Travel Itinerary', pageWidth / 2, currentY, { align: 'center' });
  currentY += 20;

  // Trip Details
  pdf.setFontSize(18);
  pdf.text(trip.destination, pageWidth / 2, currentY, { align: 'center' });
  currentY += 15;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const tripInfo = `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)} (${getTripDuration(trip.startDate, trip.endDate)} days)`;
  pdf.text(tripInfo, pageWidth / 2, currentY, { align: 'center' });
  currentY += 20;

  // Notes
  if (trip.notes) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Notes:', margin, currentY);
    currentY += 8;
    pdf.setFont('helvetica', 'normal');
    const splitNotes = pdf.splitTextToSize(trip.notes, pageWidth - 2 * margin);
    pdf.text(splitNotes, margin, currentY);
    currentY += splitNotes.length * 6 + 10;
  }

  // Itinerary
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Itinerary', margin, currentY);
  currentY += 15;

  trip.itinerary.forEach((day) => {
    // Check if we need a new page
    if (currentY > 250) {
      pdf.addPage();
      currentY = margin;
    }

    // Date
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(formatDate(day.date), margin, currentY);
    currentY += 10;

    // Accommodation
    if (day.accommodation) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Accommodation: ${day.accommodation}`, margin + 10, currentY);
      currentY += 8;
    }

    // Activities
    day.activities.forEach((activity) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text(`${activity.time} - ${activity.title}`, margin + 10, currentY);
      currentY += 6;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      if (activity.description) {
        const splitDescription = pdf.splitTextToSize(activity.description, pageWidth - 2 * margin - 20);
        pdf.text(splitDescription, margin + 20, currentY);
        currentY += splitDescription.length * 4;
      }
      
      if (activity.location) {
        pdf.setFont('helvetica', 'italic');
        pdf.text(`📍 ${activity.location}`, margin + 20, currentY);
        currentY += 6;
      }
      
      currentY += 3;
    });

    currentY += 8;
  });

  // Save the PDF
  pdf.save(`${trip.destination.replace(/[^a-zA-Z0-9]/g, '_')}_itinerary.pdf`);
};